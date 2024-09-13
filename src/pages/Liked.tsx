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

            <div className="flex-1 overflow-y-auto bg-indigo-900 w-screen relative">
                <div className="p-6 bg-gray-100 w-full">
                    <h1 className="text-3xl font-bold text-indigo-900 mb-6">Liked Cards</h1>
                    {swipedCards.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg">
                                <thead>
                                    <tr className="bg-indigo-500 text-white uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Color Identity</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm">
                                    {swipedCards.map((card, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                                            <td className="py-3 px-6 text-left">
                                                <a href={card.url} className="text-indigo-600 hover:underline">{card.name}</a>
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
                        <p className="text-gray-600">No liked cards found.</p>
                    )}
                </div>
            </div>

        </BasicLayout>
    );
};

export default Liked;
