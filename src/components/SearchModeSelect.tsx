import { useEffect } from 'react';
import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from '../types/SelectOption';

type Props = {
    selectedMode?: SelectOption,
    onChange: (option?: SelectOption) => void
}

export default function SearchModeSelect({ selectedMode, onChange }: Props) {
    
    useEffect(() => {
        getModeOptions().then(options => {
            onChange(options[0]);
        });
    });

    const getModeOptions = (): Promise<SelectOption[]> => {
        return Promise.resolve([
            { label: "Media and Album Cover", value: 2 },
            { label: "All Media", value: 1 },
		    { label: "Media with no Album", value: 3 }
        ]);
    }
    
    return <BaseSingleSelect
                placeHolder={"Sort By"}
                onChange={onChange}
                selectedOption={selectedMode}
                getOptions={getModeOptions}
            />;
}
