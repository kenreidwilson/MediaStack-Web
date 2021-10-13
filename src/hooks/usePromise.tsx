import { useEffect, useState } from "react";

export function usePromise<T>(task: () => Promise<T>) {
    const [state, setState] = useState<{loading: boolean, error: Error | null, data: T | null }>
        ({loading: true, error: null, data: null });


    useEffect(() => {
        task()
            .then(data => setState({ data, loading: false, error: null}))
            .catch(error => setState({ data: null, loading: false, error }));
    }, []);

    return state;
};
