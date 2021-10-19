import SelectOption from '../../types/SelectOption';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedSortOption?: SelectOption,
    onChange: (option?: SelectOption) => void
}

export default function SortBySelect({ selectedSortOption, onChange }: Props) {

    const options = [
        { label: 'Category', value: 'Category'}, 
        { label: 'Score', value: 'Score'}
    ];

    return <BaseSingleSelect
                placeHolder={'Sort By'}
                onChange={onChange}
                selectedOption={selectedSortOption}
                options={options}
            />;
}
