import { useState } from "react";
import { Theme, ThemeName } from "../types/Theme";

export const lightTheme: Theme = { 
    name: 'light',
    style: {
        backgroundColor: "white",
        color: "black",
        primaryColor: "rgb(0, 102, 255)"
    }
}

export const darkTheme: Theme = {
    name: 'dark',
    style: {
        backgroundColor: "#1d1d1d",
        color: "rgb(200, 200, 200)",
        primaryColor: "rgb(0, 102, 255)"
    }
}

export default function useThemes() {

    const [theme, setTheme] = useState<Theme>(darkTheme);

    const setThemeByName = (name: ThemeName) => {
        switch(name) {
            case 'dark':
                setTheme(darkTheme);
                break;
            case 'light':
                setTheme(lightTheme);
                break;
            default:
                setTheme(lightTheme);
                break;
        }
    }

    return { theme, setTheme: setThemeByName };
}
