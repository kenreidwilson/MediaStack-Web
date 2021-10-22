import { useState } from 'react';

type State<T> = {
    isLoading: boolean,
    error: Error | undefined,
    result: T | undefined
}

type ReturnType<T> = {
    isLoading: boolean,
    error: Error | undefined,
    result: T | undefined,
    dispatch: () => void
}

export default function usePromise<T>(promise: () => Promise<T>): ReturnType<T> {

    const [ { isLoading, error, result}, setState ] = useState<State<T>>({ isLoading: false, error: undefined, result: undefined });

    const dispatch = (): void => {
        setState({ isLoading: true, error: undefined, result: undefined });
        try {
            promise()
                .then(result => setState({ isLoading: false, error: undefined, result }));
        } catch (error: any) {
            setState({ isLoading: false, error, result: undefined });
        }
    }

    return { isLoading, error, result, dispatch };
}
