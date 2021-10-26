import { useState } from 'react';

interface State<T> {
    isLoading: boolean,
    error: Error | undefined,
    result: T | undefined
}

export default function usePromise<T, PT = undefined>(promise: (param?: PT) => Promise<T>): {
    isLoading: boolean,
    error: Error | undefined,
    result: T | undefined,
    resolve: (param?: PT) => Promise<void>,
    reset: () => void } {

    const defaultState: State<T> = { isLoading: false, error: undefined, result: undefined };

    const [ state , setState ] = useState<State<T>>(defaultState);

    const reset = (): void => {
        setState(defaultState);
    }

    const resolve = async (param?: PT): Promise<void> => {
        setState({ isLoading: true, error: undefined, result: undefined });
        try {
            let result = await promise(param);
            setState({ isLoading: false, error: undefined, result });
        } catch (error: any) {
            setState({ isLoading: false, error, result: undefined });
        }
    }

    return { ...state, resolve, reset };
}
