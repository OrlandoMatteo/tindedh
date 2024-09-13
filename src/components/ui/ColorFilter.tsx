import React from 'react';
import FilterCard from './FilterCard';
import { useColorIdentityStore} from '../../store/colorIdentityState';

const ColorFilter: React.FC = () => {
    const colorIdentityStore = useColorIdentityStore();

    const handleCheckboxChange = (color: string) => {
        colorIdentityStore.toggle(color);
    };

    return (
        <FilterCard title='Colors'>
            <div className="grid grid-cols-6 justify-items m-auto grow my-2">
                {Object.entries(colorIdentityStore.colors).map(([color,value]) => (
                    <div key={color} className='col-span-2 flex flex-col'>
                        <img src={value.icon} className='w-12 m-auto p-2' />
                        <input
                            className='m-auto w-4 h-4 border-2 rounded-sm bg-white my-1'
                            type="checkbox"
                            value={color}
                            checked={value.isEnabled}
                            onChange={() => handleCheckboxChange(color)}
                        />
                    </div>
                ))}
            </div>
        </FilterCard>
    );
};

export default ColorFilter;
