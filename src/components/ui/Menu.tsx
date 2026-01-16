import { Link } from '@tanstack/react-router';
import React from 'react';

const Menu: React.FC = () => {
    return (
        <div className="h-full font-bold">
            <div className='grid h-full w-full grid-cols-3 items-center justify-item bg-white px-3 text-center dark:bg-slate-900'>
                <Link to='/'><div className="text-indigo-900 dark:text-slate-100"><span className="material-symbols-outlined text-[clamp(1.8rem,7vw,2.25rem)] rotate-180">
                    style
                </span></div></Link>
                <Link to="/liked">
                    <div className="text-indigo-900 dark:text-slate-100"><span className="material-symbols-outlined text-[clamp(1.8rem,7vw,2.25rem)]">
                        favorite
                    </span></div>
                </Link>
                <Link to='/settings'><div className="text-indigo-900 dark:text-slate-100"><span className="material-symbols-outlined text-[clamp(1.8rem,7vw,2.25rem)]">
                    tune
                </span></div></Link>
            </div>
        </div>
    );
};

export default Menu;
