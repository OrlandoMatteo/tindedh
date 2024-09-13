// @ts-nocheck
import { useState, useEffect } from 'react';

import { useManaCostStore, ManaCostState } from "../../store/manacostState"
import { useColorIdentityStore } from '../../store/colorIdentityState';



function MtgCard() {
    const [currentCard, setCurrentCard] = useState({
        name: 'Default Card',
        image: 'https://preview.redd.it/magic-card-back-v0-z447uhqddz9a1.jpg?auto=webp&s=8f4baba66011cbf8cd51d9ea5af0c69831fe614d',
        url: null,
    });
    const [isLoading, setIsLoading] = useState(true);  // New loading state
    const [nextCard, setNextCard] = useState(null);
    const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
    const [translateX, setTranslateX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [isCardHidden, setIsCardHidden] = useState(false);
    const [isNewCardVisible, setIsNewCardVisible] = useState(false);

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

    // Fetch first card and show default image while waiting
    useEffect(() => {
        const loadInitialCard = async () => {
            setIsLoading(true);  // Start loading
            const initialCard = await fetchData();
            setCurrentCard(initialCard);  // Update current card
            setNextCard(await fetchData());  // Load next card
            setIsLoading(false);  // End loading
        };

        loadInitialCard();  // Trigger the card loading
    }, []);  // Empty dependency array to run only once on mount

    const loadNewCard = async () => {
        setIsCardHidden(true);
        setIsNewCardVisible(true);

        setTimeout(async () => {
            setCurrentCard(nextCard);
            setNextCard(await fetchData());
            resetPosition();
            setIsCardHidden(false);
            setIsNewCardVisible(false);
            setIsSwiping(false);
        }, 10);
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
            if (deltaX > 0) {
                saveCardToLocalStorage(currentCard);
            }
            loadNewCard();
        } else {
            resetPosition();
        }
    };

    const resetPosition = () => {
        setTranslateX(0);
    };

    const saveCardToLocalStorage = (card) => {
        if (!card.url) {
            return;
        }
        const savedCards = JSON.parse(localStorage.getItem('swipedCards')) || [];
        savedCards.push(card);
        localStorage.setItem('swipedCards', JSON.stringify(savedCards));
    };

    const rotateDegree = translateX / 10;

    return (
        <div className='flex justify-center items-center'>
            {/* The next card underneath the current card */}
            {nextCard && (
                <div className={`next-card ${isNewCardVisible ? 'visible' : ''}`}>
                    <img src={nextCard.image} alt={nextCard.name} className='rounded-2xl m-4 w-80' />
                </div>
            )}

            {/* The current swiping card */}
            <div
                className={`absolute card current-card ${isCardHidden ? 'hidden' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateX(${translateX}px) rotate(${rotateDegree}deg)`,
                    transition: isSwiping ? 'transform 0.1s ease' : 'none'
                }}
            >
                {isLoading ? (
                    <img src='https://preview.redd.it/magic-card-back-v0-z447uhqddz9a1.jpg?auto=webp&s=8f4baba66011cbf8cd51d9ea5af0c69831fe614d' alt="Loading..." className='rounded-2xl shadow-2xl m-4 w-80' />
                ) : (
                    <img src={currentCard.image} alt={currentCard.name} className='rounded-2xl shadow-2xl m-4 w-80' />
                )}
            </div>

            {isLoading && <h3 className='absolute bottom-32 text-white text-[1.7rem] font-bold'>Loading card...</h3>}
        </div>
    );
}


export default MtgCard;
