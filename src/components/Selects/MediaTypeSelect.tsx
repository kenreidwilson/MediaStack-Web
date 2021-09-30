import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from './SelectOption';

type Props = {
    selectedType?: SelectOption,
    onChange: (option?: SelectOption) => void
}

export default function MediaTypeSelct({ selectedType, onChange }: Props) {

    const getTypeOptions = (): Promise<SelectOption[]> => {
        return Promise.resolve([
            { label: 'Category', value: 'Category'}, 
            { label: 'Score', value: 'Score'}
        ]);
    }

    return <BaseSingleSelect
                placeHolder={"Media Type"}
                onChange={onChange}
                selectedOption={selectedType}
                getOptions={getTypeOptions}
            />;

}
