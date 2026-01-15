import { create } from 'zustand'

interface ColorIdentity {
    color: string
    isEnabled: boolean
    icon: string
}

type StoredColorState = Record<string, { isEnabled: boolean }>;

type StoredState = {
    colors?: StoredColorState;
    isExactMatch?: boolean;
};

type ColorIdentityState = {
    colors: Record<string, ColorIdentity>,
    isExactMatch: boolean,
    toggle: (color: string) => void
    setColors: (colors: string[]) => void
    toggleExactMatch: () => void
    getSelectedColors: () => string
    getColorIdentityOperator: () => string
}

const STORAGE_KEY = 'tindedh.colorIdentity';

const baseColors: Record<string, ColorIdentity> = {
    "W": { color: "W", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/W.svg', },
    "U": { color: "U", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/U.svg', },
    "B": { color: "B", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/B.svg', },
    "R": { color: "R", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/R.svg', },
    "G": { color: "G", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/G.svg', },
    "C": { color: "C", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/C.svg', },
};

const readStoredState = (): StoredState | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as StoredState) : null;
    } catch {
        return null;
    }
};

const applyStoredColors = (storedColors: StoredColorState | null) => {
    return Object.fromEntries(
        (Object.entries(baseColors) as [string, ColorIdentity][]).map(([color, value]) => [
            color,
            {
                ...value,
                isEnabled: storedColors?.[color]?.isEnabled ?? value.isEnabled,
            },
        ])
    );
};

const persistState = (state: ColorIdentityState) => {
    if (typeof window === 'undefined') {
        return;
    }
    const serialized: StoredState = {
        isExactMatch: state.isExactMatch,
        colors: Object.fromEntries(
            (Object.entries(state.colors) as [string, ColorIdentity][]).map(([color, value]) => [
                color,
                { isEnabled: value.isEnabled },
            ])
        ),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
};

const stored = readStoredState();

const initialState: ColorIdentityState = {
    colors: applyStoredColors(stored?.colors ?? null),
    isExactMatch: stored?.isExactMatch ?? false,
    toggle: () => { },
    setColors: () => { },
    toggleExactMatch: () => { },
    getSelectedColors: () => {
        let selectedColors = '';
        (Object.entries(baseColors) as [string, ColorIdentity][]).forEach(([color, value]) => {
            if (value.isEnabled) {
                selectedColors += color;
            }
        });
        return selectedColors;
    },
    getColorIdentityOperator: () => '%3C%3D'
};

const useColorIdentityStore = create<ColorIdentityState>()((set, get) => ({
    ...initialState,
    toggle: (color: string) => set((state) => {
        const nextState = {
            ...state,
            colors: {
                ...state.colors,
                [color]: {
                    ...state.colors[color],
                    isEnabled: !state.colors[color]?.isEnabled,
                    color: state.colors[color]?.color ?? color,
                    icon: state.colors[color]?.icon ?? color,
                }
            }
        };
        persistState(nextState);
        return nextState;
    }),
    setColors: (colors: string[]) => set((state) => {
        const selected = new Set(colors);
        const nextState = {
            ...state,
            colors: Object.fromEntries(
                (Object.entries(state.colors) as [string, ColorIdentity][]).map(([color, value]) => [
                    color,
                    {
                        ...value,
                        isEnabled: selected.has(color),
                    },
                ])
            ),
        };
        persistState(nextState);
        return nextState;
    }),
    toggleExactMatch: () => set((state) => {
        const nextState = {
            ...state,
            isExactMatch: !state.isExactMatch
        };
        persistState(nextState);
        return nextState;
    }),
    getSelectedColors: () => {
        let selectedColors = '';
        (Object.entries(get().colors) as [string, ColorIdentity][]).forEach(([color, value]) => {
            if (value.isEnabled) {
                selectedColors += color;
            }
        });
        if (selectedColors.length === 0) {
            selectedColors = 'WUBRG';
        }
        return selectedColors;
    },
    getColorIdentityOperator: () => (get().isExactMatch ? '%3D' : '%3C%3D')
}));

export { useColorIdentityStore };
