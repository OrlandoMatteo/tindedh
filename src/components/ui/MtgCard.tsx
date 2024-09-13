// @ts-nocheck
import { useState, useEffect } from 'react';

import { useManaCostStore, ManaCostState } from "../../store/manacostState"
import { useColorIdentityStore } from '../../store/colorIdentityState';



function MtgCard() {
    const [currentCard, setCurrentCard] = useState({
        name: '',
        image: 'https://preview.redd.it/magic-card-back-v0-z447uhqddz9a1.jpg?auto=webp&s=8f4baba66011cbf8cd51d9ea5af0c69831fe614d',
        url: null,
    });
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const [nextCard, setNextCard] = useState(null);
    const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
    const [translateX, setTranslateX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [isCardHidden, setIsCardHidden] = useState(false);
    const [isNewCardVisible, setIsNewCardVisible] = useState(false); // New state for new card visibility

    const manaCostFilter = useManaCostStore((state: ManaCostState) => state.cost)
    const colorIdentityFilter = useColorIdentityStore((state) => state.getSelectedColors)

    const fetchData = async () => {
        const url = "https://api.scryfall.com/cards/random?q=is%3Acommander+cmc<" + manaCostFilter.toString() + "+commander%3A" + colorIdentityFilter();
        const resp = await fetch(url, {
            method: 'get',
        });
        const data = await resp.json();
        return { name: data["name"], image: data["image_uris"]["large"], url: data["scryfall_uri"], colorIdentity: data["color_identity"] };
    };



    useEffect(() => {
        // Load the next card in advance
        fetchData().then(newCard => setNextCard(newCard));
    }, []);

    const loadNewCard = async () => {
        setIsCardHidden(true); // Hide the card during transition
        setIsNewCardVisible(true);
        ``
        // Allow time for the old card to reset and hide
        setTimeout(async () => {
            setCurrentCard(nextCard);
            setNextCard(await fetchData());
            resetPosition();
            setIsCardHidden(false); // Show the new card once ready
            setIsNewCardVisible(false);
            setIsSwiping(false);
        }, 10); // Match the CSS transition duration
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setStartTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const newTranslateX = touch.clientX - startTouch.x;
        setTranslateX(newTranslateX);
    };

    const handleTouchEnd = (e) => {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - startTouch.x;

        if (Math.abs(deltaX) > 100) {
            setIsSwiping(true);
            setIsFirstLoad(false);
            if (deltaX > 0) {
                saveCardToLocalStorage(currentCard); // Save if swiped to the right
            }
            loadNewCard();
        } else {
            resetPosition(); // If swipe is not far enough, reset position
        }
    };

    const resetPosition = () => {
        setTranslateX(0);  // Reset translateX to 0
    };

    const rotateDegree = translateX / 10; // Rotate more as the swipe moves further

    const saveCardToLocalStorage = (card) => {
        if (card.url === null) {
            return;
        }
        const savedCards = JSON.parse(localStorage.getItem('swipedCards')) || [];
        savedCards.push(card);
        localStorage.setItem('swipedCards', JSON.stringify(savedCards));
    };

    return (
        <div className='flex justify-center items-center '>
            {/* The next card underneath the current card */}
            {nextCard && (
                <div
                    className={`next-card top-2 ${isNewCardVisible ? 'visible' : ''}`}
                >
                    <img src={nextCard.image} alt={nextCard.name} className='rounded-2xl m-4 w-80' />
                </div>
            )}

            {/* The current swiping card */}
            <div
                className={`absolute card top-2 current-card   ${isCardHidden ? 'hidden' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateX(${translateX}px) rotate(${rotateDegree}deg)`,
                    transition: isSwiping ? 'transform 0.1s ease' : 'none'
                }}
            >
                <img src={currentCard.image} alt={currentCard.name} className='rounded-2xl shadow-2xl m-4 w-80' />
            </div>
            {/* if the first load, show the loading message */}

        </div>
    );
}

export default MtgCard;
