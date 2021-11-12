import { useHistory } from 'react-router-dom';
import IMediaSearchQuery from '../types/IMediaSearchQuery';

type NavigationActionName = 'index' | 'media' | 'album' | 'search' | 'attributes' | 'upload' | 'login';

type Action = {
    name: NavigationActionName,
    data?: any
}

type NavigationAction = Action & (
    { name: 'index', data?: IMediaSearchQuery } |
    { name: 'media', data: { id: number } } |
    { name: 'album', data: { id: number } } |
    { name: 'search', data?: { p: number } & IMediaSearchQuery } |
    { name: 'attributes' } |
    { name: 'upload' } |
    { name: 'login' })

export default function useNavigation() {

    const history = useHistory();

    const navigate = (action: NavigationAction): void => {
        let path = action.name === 'index' ? '' : action.name;

        history.push({
            pathname: `/${path}`,
            search: action.data ? new URLSearchParams(objectToRecord(action.data)).toString() : undefined
        });
    };

    const navigateToNewWindow = (action: NavigationAction): void => {
        let path = action.name === 'index' ? '' : action.name;

        const win = window.open(`/${path}?${new URLSearchParams(objectToRecord(action.data)).toString()}`);
        win?.focus();
    }

    const objectToRecord = (object: { [property: string]: any }): Record<string, string> => {
        let query: Record<string, string> = {};
        for (let variable in object) {
            if (object[variable] !== undefined) {
                query[variable] = JSON.stringify(object[variable]);
            }
        }
        return query;
    };

    const getNavigationData = (): Record<string, string> => {
        let params = new URLSearchParams(window.location.search);

        let record: Record<string, string> = {};

        params.forEach((value: string, key: string) => {
            record[key] = value ? JSON.parse(value) : value;
        });

        return record;
    };

    return { navigate, navigateToNewWindow, getNavigationData };
}

export type {
    NavigationAction
}
