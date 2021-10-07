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
        setAlerts(errors.map(error => { return { isDismissed: false, variant: 'danger', message: error.message } }));
    }, [errors]);

    const addError = (error: Error) => setErrors([...errorsRef.current, error]);

    const getErrors = () => errors;

    const getAlertHeading = (alert: MSAlert): string => {
        if (alert.variant === 'danger') {
            return "Something went wrong.";
        }
        return "Alert";
    }

    return (
        <ErrorContext.Provider value={{ getErrors, addError }}>
            <Navigation />
            {alerts.map(alert => <MSBannerAlert variant={alert.variant} heading={getAlertHeading(alert)} body={alert.message ? alert.message : ""}/>)}
            {children}
        </ErrorContext.Provider>
    );
}
