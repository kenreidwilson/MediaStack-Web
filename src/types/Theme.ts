import React from "react";

export type ThemeName = 'dark' | 'light'

export interface ThemeStyle extends React.CSSProperties {
    backgroundColor: string
    color: string,
}

export interface Theme {
    name: ThemeName,
    style: ThemeStyle
}
