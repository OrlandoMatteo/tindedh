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
        name: 'Aeve, Progenitor Ooze',
        url: 'https://cards.scryfall.io/normal/front/d/f/dfe9b1b8-dffe-427d-be1e-2c6b8395bd54.jpg?1626097164'
    });

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

        // Allow time for the old card to reset and hide
        setTimeout(async () => {
            setCurrentCard(nextCard);
            setNextCard(await fetchData());
            resetPosition();
            setIsCardHidden(false); // Show the new card once ready
            setIsNewCardVisible(false);
            setIsSwiping(false);
        }, 100); // Match the CSS transition duration
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
        <div className='flex justify-center p-8 card-container h-svh'>
            {/* The next card underneath the current card */}
            {nextCard && (
                <div
                    className={`absolute card next-card ${isNewCardVisible ? 'visible' : ''}`}
                >
                    <img src={nextCard.url} alt={nextCard.name} className='rounded-2xl' />
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
                <img src={currentCard.url} alt={currentCard.name} className='rounded-2xl shadow-2xl' />
                <h3 className='text-2xl font-bold text-center text-slate-300'>{currentCard.name}</h3>
            </div>
        </div>
    );
}

export default MtgCard;
