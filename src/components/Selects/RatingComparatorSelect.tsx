import { SelectOption, } from '../../types';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedComparatorOption?: SelectOption,
    onChange?: (option?: SelectOption) => void
}

export default function RatingComparatorSelect({ selectedComparatorOption, onChange } : Props) {
    
    const options = [
        { label: 'Any', value: undefined },
		{ label: 'Equal', value: 'score' },
		{ label: 'Greater than', value: 'greaterThanScore' },
		{ label: 'Less than', value: 'lessThanScore' }
    ];

    return <BaseSingleSelect
        placeHolder={'Rating Compartor'}
        onChange={onChange}
        selectedOption={selectedComparatorOption}
        options={options}
    />;
}