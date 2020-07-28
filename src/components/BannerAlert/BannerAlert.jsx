import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function BannerAlert({variant, heading, body}) {
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
