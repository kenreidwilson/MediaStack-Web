import React from "react";

export type ThemeName = 'dark' | 'light'

export interface ThemeStyle extends React.CSSProperties {
    backgroundColor: string
    color: string,
    primaryColor: string,
    secondaryBackgroundColor?: string
}

export default interface Theme {
    name: ThemeName,
    style: ThemeStyle
}
