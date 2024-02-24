import classNames from 'classnames';
import { OfferPreview } from '../../types/offer-preview';
import { AppRoute, TOTAL_RAITING_STATUS } from '../../const';
import { Link } from 'react-router-dom';

type TCardProps = {
  offer: OfferPreview;
}

function Card({ offer }: TCardProps): JSX.Element {
  const offerWidthPercentage = (offer.rating / TOTAL_RAITING_STATUS) * 100;
  return (
    <article className={classNames({'cities__card': !offer.isFavorite, 'favorites__card': offer.isFavorite}, 'place-card')}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={classNames({'cities__image-wrapper': !offer.isFavorite, 'favorites__image-wrapper': offer.isFavorite}, 'place-card__image-wrapper')}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={260} height={200} alt="Place image" />
        </Link>
      </div>
      <div className={classNames({'favorites__card-info': offer.isFavorite}, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={classNames('place-card__bookmark-button', 'button')} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offerWidthPercentage}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
