import { createContext } from "react";

interface IErrorContext {
    getErrors: Function,
    addError: Function
}

export const ErrorContext = createContext<IErrorContext>({ getErrors: (): any[] => { return [] }, addError: (error: Error) => {} });