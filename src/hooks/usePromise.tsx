import { useState } from 'react';

interface State<T> {
    isLoading: boolean,
    error: Error | undefined,
    result: T | undefined
}

export default function usePromise<T>(promise: () => Promise<T>): {
    isLoading: boolean,
    error: Error | undefined,
    result: T | undefined,
    resolve: () => Promise<void> } {

    const [ state , setState ] = useState<State<T>>({ isLoading: false, error: undefined, result: undefined });

    const resolve = async (): Promise<void> => {
        setState({ isLoading: true, error: undefined, result: undefined });
        try {
            let result = await promise();
            setState({ isLoading: false, error: undefined, result });
        } catch (error: any) {
            setState({ isLoading: false, error, result: undefined });
        }
    }

    return { isLoading: state.isLoading, error: state.error, result: state.result, resolve };
}
