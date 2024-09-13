import { create } from 'zustand'

interface ColorIdentity {
    color: string
    isEnabled: boolean
    icon: string
}

type ColorIdentityState = {
    colors: Record<string, ColorIdentity>,
    toggle: (color: string) => void
    getSelectedColors: () => string
}

const initialState: ColorIdentityState = {
    colors: {
        "W": { color: "W", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/W.svg', },
        "U": { color: "U", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/U.svg', },
        "B": { color: "B", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/B.svg', },
        "R": { color: "R", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/R.svg', },
        "G": { color: "G", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/G.svg', },
        "C": { color: "C", isEnabled: false, icon: 'https://svgs.scryfall.io/card-symbols/C.svg', },
    },
    toggle: () => { },
    getSelectedColors: () => {
        let selectedColors = '';
        Object.entries(initialState.colors).forEach(([color, value]) => {
            if (value.isEnabled) {
                selectedColors += color;
                console.debug(color);
            }
        });
        return selectedColors;
    }

};

const useColorIdentityStore = create<ColorIdentityState>((set) => ({
    ...initialState,
    toggle: (color: string) => set((state) => ({
        ...state,
        colors: {
            ...state.colors,
            [color]: {
                ...state.colors[color],
                isEnabled: !state.colors[color]?.isEnabled,
                color: state.colors[color]?.color ?? color, // Ensure color is always defined
                icon: state.colors[color]?.icon ?? color,   // Ensure icon is always defined
            }
        }
    })),
    getSelectedColors: () => {
        let selectedColors = '';
        Object.entries(useColorIdentityStore.getState().colors).forEach(([color, value]) => { // Use dynamic state here
            if (value.isEnabled) {

                selectedColors += color;
                console.debug(color);
            }
        });
        if (selectedColors.length === 0) {
            selectedColors = 'WUBRG';
        }
        return selectedColors;
    }
}));

export { useColorIdentityStore };
