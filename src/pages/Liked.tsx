import React, { useEffect, useState } from 'react';
import BasicLayout from "../components/layout/Basic";

interface Card {
    name: string;
    url: string;
    colorIdentity: string[];
}

const Liked: React.FC = () => {
    const [swipedCards, setSwipedCards] = useState<Card[]>([]);

    useEffect(() => {
        const savedCards = localStorage.getItem('swipedCards');
        if (savedCards) {
            setSwipedCards(JSON.parse(savedCards) as Card[]);
        }
    }, []);

    return (
        <BasicLayout>

            <div className="flex-1 overflow-y-auto bg-indigo-900 dark:bg-slate-900 w-full relative">
                <div className="w-full bg-gray-100 p-6 dark:bg-slate-900">
                    <h1 className="mb-6 text-3xl font-bold text-indigo-900 dark:text-slate-100">Liked Cards</h1>
                    {swipedCards.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full rounded-lg bg-white shadow-md dark:bg-slate-800">
                                <thead>
                                    <tr className="bg-indigo-500 text-sm uppercase leading-normal text-white dark:bg-slate-700">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Color Identity</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-700 dark:text-slate-200">
                                    {swipedCards.map((card, index) => (
                                        <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-700/50">
                                            <td className="py-3 px-6 text-left">
                                                <a href={card.url} className="text-indigo-600 hover:underline dark:text-amber-300">{card.name}</a>
                                            </td>
                                            <td className="py-3 px-6 flex space-x-2">
                                                {card.colorIdentity && card.colorIdentity.map((color, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={`https://svgs.scryfall.io/card-symbols/${color}.svg`}
                                                        alt={color}
                                                        className="w-6 h-6"
                                                    />
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-slate-300">No liked cards found.</p>
                    )}
                </div>
            </div>

        </BasicLayout>
    );
};

export default Liked;
