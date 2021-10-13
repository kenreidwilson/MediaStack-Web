import RatingSelect from "./RatingSelect";

type Props = {
    ratingValue: number,
    onChange?: (option: number) => void
}

export default function RatingValueSelect({ ratingValue, onChange }: Props) {
    return <RatingSelect ratingOption={{ value: ratingValue }} onChange={(ratingOption) => ratingOption && onChange ? onChange(ratingOption.value) : () => {}}/>
}
