import StarRatingComponent from "react-star-rating-component";

type Props = {
    ratingValue: number,
    onChange?: (option: number) => void
}

export default function RatingValueSelect({ ratingValue, onChange }: Props) {
    return <StarRatingComponent
        name="rating"
        starCount={5}
        value={ratingValue}
        onStarClick={onChange}
    />;
}
