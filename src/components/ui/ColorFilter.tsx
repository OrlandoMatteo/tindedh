import React from 'react';
import FilterCard from './FilterCard';
import { useColorIdentityStore} from '../../store/colorIdentityState';

const ColorFilter: React.FC = () => {
    const colorIdentityStore = useColorIdentityStore();
    const colorLabels: Record<string, string> = {
        W: "White",
        U: "Blue",
        B: "Black",
        R: "Red",
        G: "Green",
        C: "Colorless",
    };
    const presetGroups = [
        {
            title: "Mono",
            presets: [
                { label: "W", name: "Mono White", colors: ["W"] },
                { label: "U", name: "Mono Blue", colors: ["U"] },
                { label: "B", name: "Mono Black", colors: ["B"] },
                { label: "R", name: "Mono Red", colors: ["R"] },
                { label: "G", name: "Mono Green", colors: ["G"] },
            ],
        },
        {
            title: "Guilds",
            presets: [
                { label: "WU", name: "Azorius", colors: ["W", "U"] },
                { label: "UB", name: "Dimir", colors: ["U", "B"] },
                { label: "BR", name: "Rakdos", colors: ["B", "R"] },
                { label: "RG", name: "Gruul", colors: ["R", "G"] },
                { label: "GW", name: "Selesnya", colors: ["G", "W"] },
            ],
        },
        {
            title: "Shards",
            presets: [
                { label: "WUB", name: "Esper", colors: ["W", "U", "B"] },
                { label: "UBR", name: "Grixis", colors: ["U", "B", "R"] },
                { label: "BRG", name: "Jund", colors: ["B", "R", "G"] },
                { label: "RGW", name: "Naya", colors: ["R", "G", "W"] },
                { label: "GWU", name: "Bant", colors: ["G", "W", "U"] },
            ],
        },
        {
            title: "Wedges",
            presets: [
                { label: "WUR", name: "Jeskai", colors: ["W", "U", "R"] },
                { label: "UBG", name: "Sultai", colors: ["U", "B", "G"] },
                { label: "BRW", name: "Mardu", colors: ["B", "R", "W"] },
                { label: "RGU", name: "Temur", colors: ["R", "G", "U"] },
                { label: "GWB", name: "Abzan", colors: ["G", "W", "B"] },
            ],
        },
        {
            title: "Utility",
            presets: [
                { label: "Colorless", name: "Colorless", colors: ["C"] },
                { label: "All", name: "All Colors", colors: ["W", "U", "B", "R", "G"] },
            ],
        },
    ];

    const handleCheckboxChange = (color: string) => {
        colorIdentityStore.toggle(color);
    };

    return (
        <FilterCard title='Colors'>
            <p className="text-sm text-slate-600">Choose one or more colors for your commander.</p>
            <div className="mt-4 grid grid-cols-6 gap-3">
                {Object.entries(colorIdentityStore.colors).map(([color,value]) => (
                    <label key={color} className="col-span-3 sm:col-span-2 cursor-pointer">
                        <input
                            className="peer sr-only"
                            type="checkbox"
                            value={color}
                            checked={value.isEnabled}
                            onChange={() => handleCheckboxChange(color)}
                        />
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/80 p-3 text-slate-700 shadow-sm transition-all duration-200 peer-checked:-translate-y-0.5 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:shadow-md">
                            <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-inner">
                                <img src={value.icon} alt={`${colorLabels[color] ?? color} mana`} className='h-9 w-9' />
                            </div>
                            <div className="text-xs font-semibold uppercase tracking-wide">{colorLabels[color] ?? color}</div>
                        </div>
                    </label>
                ))}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm">
                <div>
                    <div className="font-semibold">Exact color identity</div>
                    <div className="text-xs text-slate-500">Match only the selected colors.</div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                    <input
                        className="peer sr-only"
                        type="checkbox"
                        checked={colorIdentityStore.isExactMatch}
                        onChange={colorIdentityStore.toggleExactMatch}
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-amber-400" />
                    <div className="absolute left-0.5 top-0.5 h-5 w-5 translate-x-0 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </label>
            </div>
            <details className="mt-5 rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold">Presets</summary>
                <div className="mt-3 space-y-3">
                    {presetGroups.map((group) => (
                        <div key={group.title}>
                            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                {group.title}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {group.presets.map((preset) => (
                                    <button
                                        key={preset.label}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-slate-900"
                                        type="button"
                                        title={preset.name}
                                        onClick={() => colorIdentityStore.setColors(preset.colors)}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </details>
        </FilterCard>
    );
};

export default ColorFilter;
