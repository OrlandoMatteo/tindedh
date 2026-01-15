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
    const [error, setError] = useState<string | null>(null);
    const [nextCard, setNextCard] = useState(null);
    const [lastCard, setLastCard] = useState(null);
    const [lastSwipeLiked, setLastSwipeLiked] = useState(false);
    const [errorType, setErrorType] = useState<'no-results' | 'generic' | null>(null);
    const [animateIntro, setAnimateIntro] = useState(false);
    const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
    const [translateX, setTranslateX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const [isCardHidden, setIsCardHidden] = useState(false);
    const [isNewCardVisible, setIsNewCardVisible] = useState(false);

    const manaCostFilter = useManaCostStore((state: ManaCostState) => state.cost)
    const colorIdentityFilter = useColorIdentityStore((state) => state.getSelectedColors)
    const colorIdentityOperator = useColorIdentityStore((state) => state.getColorIdentityOperator)

    const fetchData = async () => {
        const url = "https://api.scryfall.com/cards/random?q=is%3Acommander+cmc<" + manaCostFilter.toString() + "+commander" + colorIdentityOperator() + colorIdentityFilter();
        const resp = await fetch(url, { method: 'get' });
        if (!resp.ok) {
            if (resp.status === 404) {
                throw new Error('no-results');
            }
            throw new Error('request-failed');
        }
        const data = await resp.json();
        if (!data?.image_uris?.large) {
            throw new Error('invalid-card');
        }
        return { name: data["name"], image: data["image_uris"]["large"], url: data["scryfall_uri"], colorIdentity: data["color_identity"] };
    };

    const vibrate = (pattern: number | number[]) => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    };

    const loadInitialCard = async () => {
        setIsLoading(true);
        setError(null);
        setErrorType(null);
        try {
            const initialCard = await fetchData();
            const initialNext = await fetchData();
            setCurrentCard(initialCard);
            setNextCard(initialNext);
            setAnimateIntro(true);
            setTimeout(() => setAnimateIntro(false), 700);
        } catch (err) {
            const isNoResults = err instanceof Error && err.message === 'no-results';
            setErrorType(isNoResults ? 'no-results' : 'generic');
            setError(isNoResults ? 'No commanders match these filters.' : 'Could not load cards. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch first card and show default image while waiting
    useEffect(() => {
        loadInitialCard();
    }, []);  // Empty dependency array to run only once on mount

    const loadNewCard = async (delay = 260) => {
        if (!nextCard) {
            return;
        }
        setIsNewCardVisible(true);
        setTimeout(async () => {
            setIsCardHidden(true);
            try {
                const fetchedNext = await fetchData();
                setCurrentCard(nextCard);
                setNextCard(fetchedNext);
            } catch (err) {
                const isNoResults = err instanceof Error && err.message === 'no-results';
                setErrorType(isNoResults ? 'no-results' : 'generic');
                setError(isNoResults ? 'No commanders match these filters.' : 'Could not load cards. Please try again.');
            }
            resetPosition();
            setIsCardHidden(false);
            setIsNewCardVisible(false);
            setIsSwiping(false);
        }, delay);
    };

    const handleTouchStart = (e) => {
        if (isLoading || error) {
            return;
        }
        const touch = e.touches[0];
        setIsDragging(true);
        setStartTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e) => {
        if (isLoading || error) {
            return;
        }
        const touch = e.touches[0];
        const newTranslateX = touch.clientX - startTouch.x;
        setTranslateX(newTranslateX);
    };

    const handleTouchEnd = (e) => {
        if (isLoading || error) {
            return;
        }
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - startTouch.x;
        setIsDragging(false);

        if (Math.abs(deltaX) > 200) {
            if (!nextCard) {
                resetPosition();
                return;
            }
            setIsSwiping(true);
            const liked = deltaX > 0;
            setLastCard(currentCard);
            setLastSwipeLiked(liked);
            if (liked) {
                saveCardToLocalStorage(currentCard);
                vibrate(15);
            } else {
                vibrate(10);
            }
            setTranslateX(liked ? 520 : -520);
            loadNewCard(240);
        } else {
            resetPosition();
        }
    };

    const resetPosition = () => {
        setTranslateX(0);
    };

    const swipeCard = (direction: 'left' | 'right') => {
        if (isLoading || !currentCard || !nextCard) {
            return;
        }
        const liked = direction === 'right';
        setIsSwiping(true);
        setIsDragging(false);
        setLastCard(currentCard);
        setLastSwipeLiked(liked);
        if (liked) {
            saveCardToLocalStorage(currentCard);
            vibrate(15);
        } else {
            vibrate(10);
        }
        setTranslateX(liked ? 520 : -520);
        loadNewCard(240);
    };

    const rewindCard = () => {
        if (!lastCard) {
            return;
        }
        if (lastSwipeLiked) {
            removeCardFromLocalStorage(lastCard);
        }
        const currentAsNext = currentCard;
        setCurrentCard(lastCard);
        setNextCard(currentAsNext);
        setLastCard(null);
        setLastSwipeLiked(false);
        resetPosition();
        setIsSwiping(false);
    };

    const saveCardToLocalStorage = (card) => {
        if (!card.url) {
            return;
        }
        const savedCards = JSON.parse(localStorage.getItem('swipedCards')) || [];
        savedCards.push(card);
        localStorage.setItem('swipedCards', JSON.stringify(savedCards));
    };

    const removeCardFromLocalStorage = (card) => {
        if (!card?.url) {
            return;
        }
        const savedCards = JSON.parse(localStorage.getItem('swipedCards')) || [];
        const updatedCards = savedCards.filter((saved) => saved?.url !== card.url);
        localStorage.setItem('swipedCards', JSON.stringify(updatedCards));
    };

    const rotateDegree = translateX / 10;
    const rotateY = translateX / 20;
    const swipeStrength = Math.min(1, Math.abs(translateX) / 150);
    const likeOpacity = translateX > 0 ? 0.45 + swipeStrength * 0.55 : 0;
    const nopeOpacity = translateX < 0 ? 0.45 + swipeStrength * 0.55 : 0;

    return (
        <div className='flex flex-col items-center justify-center' style={{ perspective: '1000px' }}>
            <div className='relative flex h-[520px] w-[320px] items-center justify-center'>
                {/* The next card underneath the current card */}
                {nextCard && (
                    <div className={`next-card absolute inset-0 flex items-center justify-center ${animateIntro ? 'card-enter-delay' : ''} ${isNewCardVisible ? 'visible' : ''}`}>
                        <img src={nextCard.image} alt={nextCard.name} className='m-4 w-80 rounded-2xl shadow-2xl object-cover aspect-[63/88]' />
                    </div>
                )}

                {/* The current swiping card */}
                <div
                    className={`absolute inset-0 flex items-center justify-center card current-card ${animateIntro ? 'card-enter' : ''} ${isCardHidden ? 'hidden' : ''}`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        transform: `translateX(${translateX}px) rotateZ(${rotateDegree}deg) rotateY(${rotateY}deg)`,
                        transformStyle: 'preserve-3d',
                        transition: isDragging ? 'none' : 'transform 0.35s ease-out'
                    }}
                >
                    <div className="relative">
                        {error ? (
                            <div className='m-4 flex w-80 flex-col items-center justify-center gap-3 rounded-2xl bg-white/90 p-6 text-center text-slate-700 shadow-2xl dark:bg-slate-900/90 dark:text-slate-100'>
                                <div className="text-sm font-semibold">{errorType === 'no-results' ? 'No results for these filters' : 'Could not load cards'}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-300">
                                    {errorType === 'no-results'
                                        ? 'Try widening your color or mana filters.'
                                        : 'Check your connection and try again.'}
                                </div>
                                <button
                                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                                    onClick={loadInitialCard}
                                >
                                    Retry
                                </button>
                            </div>
                        ) : isLoading ? (
                            <div className='m-4 h-[460px] w-80 animate-pulse rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 shadow-2xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-800' />
                        ) : (
                            <img src={currentCard.image} alt={currentCard.name} className='m-4 w-80 rounded-2xl shadow-2xl object-cover aspect-[63/88]' />
                        )}

                        {!isLoading && !error && (
                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                                <div
                                    className="absolute inset-0 bg-emerald-400/20"
                                    style={{ opacity: likeOpacity }}
                                />
                                <div
                                    className="absolute inset-0 bg-rose-400/20"
                                    style={{ opacity: nopeOpacity }}
                                />
                                <div
                                    className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border-2 border-emerald-400 bg-white/75 px-7 py-5 text-2xl font-extrabold uppercase tracking-[0.3em] text-emerald-500 shadow-xl dark:bg-slate-900/70"
                                    style={{ opacity: likeOpacity }}
                                >
                                    Like
                                    <span className="text-3xl">❤</span>
                                </div>
                                <div
                                    className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border-2 border-rose-400 bg-white/75 px-7 py-5 text-2xl font-extrabold uppercase tracking-[0.3em] text-rose-500 shadow-xl dark:bg-slate-900/70"
                                    style={{ opacity: nopeOpacity }}
                                >
                                    Nope
                                    <span className="text-3xl">✕</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
                <button
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-rose-500 shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-900 dark:text-rose-400"
                    onClick={() => swipeCard('left')}
                    aria-label="Dislike"
                    disabled={isLoading || !!error}
                >
                    <span className="text-xl font-bold">✕</span>
                </button>
                <button
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-900 dark:text-slate-200"
                    onClick={rewindCard}
                    aria-label="Rewind"
                    disabled={!lastCard || isLoading || !!error}
                >
                    <span className="text-lg font-bold">↺</span>
                </button>
                <button
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-500 shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-900 dark:text-emerald-400"
                    onClick={() => swipeCard('right')}
                    aria-label="Like"
                    disabled={isLoading || !!error}
                >
                    <span className="text-xl font-bold">❤</span>
                </button>
            </div>
        </div>
    );
}


export default MtgCard;
