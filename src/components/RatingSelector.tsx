import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import './RatingSelector.css';

type RatingComparator = {
	value: string | undefined,
	label: string
}

type Props = {
	ratingValue: number,
	onChange: Function
}

export default function RatingSelector({ ratingValue, onChange }: Props) {

	const options: RatingComparator[] = [
		{ label: "Any", value: undefined },
		{ label: "Equal", value: "score" },
		{ label: "Greater than", value: 'greaterThanScore' },
		{ label: "Less than", value: 'lessThanScore' }
	]

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [rating, setRating] = useState<number>(0);
	const [selectedComparator, setSelectedComparator] = useState<RatingComparator>(options[0]);

	const onRatingSelected = (nextValue: number) => {
		let comparator: RatingComparator = selectedComparator;
		if (selectedComparator.label === 'Any') {
			comparator = options.find(c => c.label === "Equal")!;
			setSelectedComparator(comparator);
		};
		let newRating = nextValue === ratingValue ? 0 : nextValue;
		setRating(newRating);
		onChange(newRating, comparator.value);
	}

	return (
		<div id="rating_selector">
			<div id="rating_selector_dropdown" className="dropdown" onClick={() => setIsOpen(!isOpen)}>
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
				>{selectedComparator.label}</button>
				<div className={`dropdown-menu${isOpen ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
					{options.map(option =>
						<a
							key={option.label as string}
							className="dropdown-item"
							onClick={() => { setSelectedComparator(option); onChange(rating, option.value); }}
							href="#nogo">
							{option.label}
						</a>
					)}
				</div>
			</div>
			<div id="rating_selector_stars">
				<StarRatingComponent
					name="rating"
					starCount={5}
					value={ratingValue}
					onStarClick={onRatingSelected}
				/>
			</div>
		</div>
	);
}
