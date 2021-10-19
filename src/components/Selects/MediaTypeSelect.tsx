import SelectOption from '../../types/SelectOption';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedType?: SelectOption,
    onChange: (option?: SelectOption) => void
}

export default function MediaTypeSelct({ selectedType, onChange }: Props) {

    const options = [
        { label: 'Image', value: 1}, 
        { label: 'Animated Image', value: 2}, 
        { label: 'Video', value: 3}
    ];

    return <BaseSingleSelect
                placeHolder={'Media Type'}
                onChange={onChange}
                selectedOption={selectedType}
                options={options}
            />;

}
