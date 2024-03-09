import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter, getImageSize, getRating } from '@utils/common';
import { AppRoute } from '@const';
import { Offer } from '@type/offer';
import { Size } from '@type/size';

type TCardProps = {
  offer: Offer;
  block: string;
  size?: Size;
  onMouseOver?: (offer: Offer | null) => void;
}

function Card({ offer, block, size = 'large', onMouseOver }: TCardProps): JSX.Element {
  const handleOfferHover = () => {
    if(onMouseOver) {
      onMouseOver(offer);
    }
  };

  const handleOfferLeave = () => {
    if(onMouseOver) {
      onMouseOver(null);
    }
  };

  return (
    <article className={`${block}__card place-card`} onMouseOver={handleOfferHover} onMouseLeave={handleOfferLeave}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} {...getImageSize(size)} alt="Place image" />
        </Link>
      </div>
      <div className={classNames({'favorites__card-info': block === 'favorites'}, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={classNames('place-card__bookmark-button', 'button', {'place-card__bookmark-button--active': offer.isFavorite})} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(offer.rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default Card;
