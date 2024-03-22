import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { RATINGS } from '@const';
import { useAppDispatch } from '@hooks/index';
import { addCommentAction } from '@store/thunks/comments';

type TOfferFromProps = {
  offerId: string;
}

type TFormData = {
  review: string;
  rating: number;
}

function OfferCommentForm({ offerId }: TOfferFromProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [reviewData, setReviewData] = useState<TFormData>({
    rating: 0,
    review: '',
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    const {name, value} = evt.target;
    const newValue = name === 'rating' ? parseInt(value, 10) : value;
    setReviewData({...reviewData, [name]: newValue});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(addCommentAction({
      offerId: offerId,
      comment: reviewData.review,
      rating: reviewData.rating,
    }));

    setReviewData({
      rating: 0,
      review: '',
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATINGS.map((rating) => (
            <Fragment key={rating.value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                id={`${rating.value}-stars`}
                type="radio"
                value={rating.value}
                onChange={handleFieldChange}
              />
              <label htmlFor={`${rating.value}-stars`} className="reviews__rating-label form__rating-label" title={rating.title}>
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
        value={reviewData.review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default OfferCommentForm;