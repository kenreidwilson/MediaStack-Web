import { useState, useEffect } from 'react';

export default function useAPI(apiFunction: Function, callback?: Function, onError?: Function) {
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        apiFunction()
            .then((response: any) => {
                setResponse(response);
                setIsLoading(false);
                if (callback) callback(response);
            })
            .catch((error: any) => {
                setError(error);
                setIsLoading(false);
                if (onError) onError(error);
            });
    }, [apiFunction, callback]);

    return [isLoading, response, error];
}
