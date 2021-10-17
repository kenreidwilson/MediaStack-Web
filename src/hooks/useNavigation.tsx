import { useHistory } from "react-router-dom";

export default function useNavigation() {

    const history = useHistory();

    const navigate = (name: string, data?: any) => {
        history.push({
            pathname: name,
            search: data ? new URLSearchParams(objectToRecord(data)).toString() : undefined
        });
    };

    const objectToRecord = (object: { [property: string]: any }): Record<string, string> => {
        let query: Record<string, string> = {};
        for (let variable in object) {
            if (object[variable] !== undefined) {
                query[variable] = JSON.stringify(object[variable]);
            }
        }
        return query;
    };

    const getNavigationData = () => {
        let params = new URLSearchParams(window.location.search);

        let record: Record<string, string> = {};

        params.forEach((value: string, key: string) => {
            record[key] = value ? JSON.parse(value) : value;
        });

        return record;
    };

    return { navigate, getNavigationData };
}
