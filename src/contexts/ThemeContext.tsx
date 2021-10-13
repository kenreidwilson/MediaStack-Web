import { createContext } from "react";
import { lightTheme } from "../hooks/useThemes";
import { Theme, ThemeName } from "../types/Theme";

type ThemeContextType = {
    theme: Theme,
    setTheme: (theme: ThemeName) => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    setTheme: () => { throw new Error("Not Implemented") }
});