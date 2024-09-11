// @ts-nocheck
import { useState, useEffect } from 'react';


const fetchData = async () => {
    const resp = await fetch(`https://api.scryfall.com/cards/random?q=is%3Acommander`, {
        method: 'get',
    });
    const data = await resp.json();
    return { name: data["name"], url: data["image_uris"]["large"] };
};

function MtgCard() {
    const [currentCard, setCurrentCard] = useState({
        name: '',
        url: 'https://preview.redd.it/magic-card-back-v0-z447uhqddz9a1.jpg?auto=webp&s=8f4baba66011cbf8cd51d9ea5af0c69831fe614d'
    });
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const [nextCard, setNextCard] = useState(null);
    const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
    const [translateX, setTranslateX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [isCardHidden, setIsCardHidden] = useState(false);
    const [isNewCardVisible, setIsNewCardVisible] = useState(false); // New state for new card visibility

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
            loadNewCard();
        } else {
            resetPosition(); // If swipe is not far enough, reset position
        }
    };

    const resetPosition = () => {
        setTranslateX(0);  // Reset translateX to 0
    };

    const rotateDegree = translateX / 10; // Rotate more as the swipe moves further

    return (
        <div className='flex justify-center items-center h-dvh'>
            {/* The next card underneath the current card */}
            {nextCard && (
                <div
                    className={`next-card absolute top-20 ${isNewCardVisible ? 'visible' : ''}`}
                >
                    <img src={nextCard.url} alt={nextCard.name} className='rounded-2xl m-4 min-w-[88vw] max-w-[88vw]' />
                </div>
            )}

            {/* The current swiping card */}
            <div
                className={`absolute card top-20 current-card   ${isCardHidden ? 'hidden' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateX(${translateX}px) rotate(${rotateDegree}deg)`,
                    transition: isSwiping ? 'transform 0.1s ease' : 'none'
                }}
            >
                <img src={currentCard.url} alt={currentCard.name} className='rounded-2xl shadow-2xl m-4 min-w-[88vw] max-w-[88vw]' />
            </div>
            {/* if the first load, show the loading message */}
            {<h3 className={`absolute bottom-32 text-white text-[1.7rem] font-bold ${isFirstLoad?'block':'hidden'}`}>Swipe left or right to start</h3>}
        </div>
    );
}

export default MtgCard;
