import { useState } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light',
    heading: string,
    body: string
}

export default function MSBannerAlert({variant, heading, body}: Props) {
    const [isShown, setShown]= useState(true);

    if (isShown) {
        return ( 
            <Alert variant={variant} onClose={() => setShown(false)} dismissible>
                <Alert.Heading>{heading}</Alert.Heading>
                <p>{body}</p>
            </Alert>
        );
    }
    return null;
}
