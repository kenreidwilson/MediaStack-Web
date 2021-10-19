import SelectOption from '../../types/SelectOption'
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    ratingOption?: SelectOption,
    onChange?: (rating: SelectOption) => void
}

export default function RatingSelect({ ratingOption, onChange }: Props) {
    
    const getOptions = (): SelectOption[] => {
        return [
            { label: '0', value: 0 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
        ];
    }

    return <BaseSingleSelect selectedOption={ratingOption} options={getOptions()} onChange={onChange}/>
}
