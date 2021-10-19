import MSAlert from '../types/MSAlert';
import { useEffect, useRef, useState } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import { ThemeContext } from '../contexts/ThemeContext';
import useThemes from '../hooks/useThemes';
import { css, Global } from '@emotion/react';
import MSBannerAlert from '../components/Misc/MSBannerAlert';
import Navigation from '../components/Misc/Navigation';

type Props = {
    children: JSX.Element
}

export default function BasePage({ children }: Props) {
    
    const { theme, setTheme } = useThemes();
    
    const [errors, setErrors] = useState<Error[]>([]);
    const [alerts, setAlerts] = useState<MSAlert[]>([]);

    const errorsRef = useRef<Error[]>(errors);

    useEffect(() => {
        errorsRef.current = errors;
        setAlerts(errors.map(error => { return { isDismissed: false, type: 'error', message: error.message } }));
    }, [errors]);

    const getErrors = () => errors;

    const addError = (error: Error) => setErrors([...errorsRef.current, error]);

    const getMSBannerAlertVariant = (alert: MSAlert): 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' => {
        switch(alert.type) {
            case 'critical':
                return 'danger';
            case 'error':
                return 'danger';
            case 'info':
                return 'info';
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
        }
    }

    const getAlertHeading = (alert: MSAlert): string => {
        if (alert.type === 'error' || alert.type === 'critical') {
            return 'Something went wrong.';
        }
        return 'Alert';
    }

    return (
            <ErrorContext.Provider value={{ getErrors, addError }}>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <Global styles={
                        css`
                            body {
                                background-color: ${theme.style.backgroundColor};
                                color: ${theme.style.color};
                            }
                        `} />
                    <Navigation />
                    {alerts.map(alert => <MSBannerAlert variant={getMSBannerAlertVariant(alert)} heading={getAlertHeading(alert)} body={alert.message ? alert.message : ''}/>)}
                    {children}
                </ThemeContext.Provider>
            </ErrorContext.Provider>
    );
}
