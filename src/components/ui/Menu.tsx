import React from 'react';

const Menu: React.FC = () => {
    return (
        <div className="absolute bottom-0 text-white text-[1.7rem] font-bold hidden">
            <div className='grid grid-cols-3 justify-item text-center p-4 bg-white'>
                <div className="text-indigo-900 w-[30vw]">Cards</div>
                <div className="text-indigo-900 w-[30vw]">Liked</div>
                <div className="text-indigo-900 w-[30vw]">Settings</div>
            </div>
        </div>
    );
};

export default Menu;