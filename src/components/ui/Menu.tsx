import { Link } from '@tanstack/react-router';
import React from 'react';

const Menu: React.FC = () => {
    return (
        <div className="font-bold">
            <div className='grid grid-cols-3 justify-item text-center p-3 bg-white w-screen'>
                <Link to='/'><div className="text-indigo-900 "><span className="material-symbols-outlined text-4xl rotate-180">
                    style
                </span></div></Link>
                <Link to="/liked">
                    <div className="text-indigo-900 "><span className="material-symbols-outlined text-4xl">
                        favorite
                    </span></div>
                </Link>
                <Link to='/settings'><div className="text-indigo-900 "><span className="material-symbols-outlined text-4xl">
                    tune
                </span></div></Link>
            </div>
        </div>
    );
};

export default Menu;