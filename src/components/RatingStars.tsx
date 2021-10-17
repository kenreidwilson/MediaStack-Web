import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    value: number
    onChange?: (value: number) => void,
    iconCount?: number
}

export default function RatingStars({ value, onChange = () => {}, iconCount = 5}: Props) {
    return <div style={{display: 'flex'}}>
        {Array.from({length: iconCount}, (_, index) => index).map((_, index) => (
            <FontAwesomeIcon key={index}
                onClick={() => onChange(index + 1 == value ? 0 : index + 1)} 
                icon={faStar} style={{color: index >= value ? 'grey' : 'gold'}}/>
        ))}
    </div>
}
