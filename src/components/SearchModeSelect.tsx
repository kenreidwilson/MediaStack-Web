import { useEffect } from 'react';
import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from '../types/SelectOption';

type Props = {
    selectedMode?: SelectOption,
    onChange: (option?: SelectOption) => void
}

export default function SearchModeSelect({ selectedMode, onChange }: Props) {
    
    const options = [
        { label: "Media and Album Cover", value: 2 },
        { label: "All Media", value: 1 },
        { label: "Media with no Album", value: 3 }
    ];

    useEffect(() => {
        onChange(options[0]);
    }, []);
    
    return <BaseSingleSelect
                placeHolder={"Sort By"}
                onChange={onChange}
                selectedOption={selectedMode}
                options={options}
            />;
}
