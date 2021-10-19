import { useState } from 'react';
import Theme, { ThemeName } from '../types/Theme';
import { DarkTheme } from '../themes/DarkTheme';
import { LightTheme } from '../themes/LightTheme';

export default function useThemes() {

    const [theme, setTheme] = useState<Theme>(DarkTheme);

    const setThemeByName = (name: ThemeName) => {
        switch(name) {
            case 'dark':
                setTheme(DarkTheme);
                break;
            case 'light':
                setTheme(LightTheme);
                break;
            default:
                setTheme(LightTheme);
                break;
        }
    }

    return { theme, setTheme: setThemeByName };
}
