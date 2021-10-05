import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from '../types/SelectOption';

type Props = {
    selectedSortOption?: SelectOption,
    onChange: (option?: SelectOption) => void
}

export default function SortBySelect({ selectedSortOption, onChange }: Props) {

    const options = [
        { label: 'Image', value: 1}, 
        { label: 'Animated Image', value: 2}, 
        { label: 'Video', value: 3}
    ];

    return <BaseSingleSelect
                placeHolder={"Sort By"}
                onChange={onChange}
                selectedOption={selectedSortOption}
                options={options}
            />;
}
