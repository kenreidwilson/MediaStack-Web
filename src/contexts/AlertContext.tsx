import { MSAlert } from '../types';
import { createContext } from 'react';

interface IAlertContext { 
    getAlerts: () => MSAlert[],
    addAlert: (alert: MSAlert) => void
}

export const AlertContext = createContext<IAlertContext>({
    getAlerts: () => { throw new Error('Not Implemented') },
    addAlert: () => { throw new Error('Not Implemented') }
});
