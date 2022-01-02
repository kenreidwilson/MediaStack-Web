import { Theme, ThemeName } from '../types';
import { LightTheme } from '../themes/LightTheme';
import { createContext } from 'react';

type ThemeContextType = {
    theme: Theme,
    setTheme: (theme: ThemeName) => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: LightTheme,
    setTheme: () => { throw new Error('Not Implemented') }
});
