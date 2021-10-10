import { useEffect, useRef, useState } from "react";
import MSBannerAlert from "../components/MSBannerAlert";
import Navigation from "../components/Navigation";
import MSAlert from "../types/MSAlert";
import { ErrorContext } from "../contexts/ErrorContext";

type Props = {
    children: JSX.Element
}

export default function BasePage({ children }: Props) {
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
            return "Something went wrong.";
        }
        return "Alert";
    }

    return (
        <ErrorContext.Provider value={{ getErrors, addError }}>
            <Navigation />
            {alerts.map(alert => <MSBannerAlert variant={getMSBannerAlertVariant(alert)} heading={getAlertHeading(alert)} body={alert.message ? alert.message : ""}/>)}
            {children}
        </ErrorContext.Provider>
    );
}
