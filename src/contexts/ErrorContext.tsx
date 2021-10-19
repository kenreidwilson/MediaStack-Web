import { createContext } from 'react';

interface IErrorContext {
    getErrors: () => Error[],
    addError: (error: Error) => void
}

export const ErrorContext = createContext<IErrorContext>({ 
    getErrors: () => { throw new Error('Not Implemented') }, 
    addError: (error: Error) => { throw new Error('Not Implemented') }
});
