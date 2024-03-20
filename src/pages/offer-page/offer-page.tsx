import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import Container from '@components/container/container';
import OfferCommentForm from '@components/offer-comment-form/offer-comment-form';
import ListComments from '@components/list-comments/list-comments';
import Map from '@components/map/map';
import ListOffers from '@components/list-offers/list-offers';
import { Comment } from '@type/comment';
import { capitalizeFirstLetter, getRating } from '@utils/common';
import { NEAR_OFFERS_COUNT } from '@const';
import { useAppSelector } from '@hooks/index';
import { offersSelectors } from '@store/slices/offers';

type TOfferPageProps = {
  comments: Comment[];
}

function OfferPage({ comments }: TOfferPageProps): JSX.Element {
  const { offerId } = useParams();
  const offers = useAppSelector(offersSelectors.selectOffers);
  const offerInfo = offers.find((offer) => offer.id === offerId);

  if (!offerInfo) {
    throw new Error(`Offer with id ${offerId} not found`);
  }

  const nearOffers = offers.slice(0, NEAR_OFFERS_COUNT);
  const nearOffersAndCurrent = [offerInfo, ...nearOffers];

  return (
    <Container isLoginNav classMain="page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offerInfo?.images.map((image) => (
              <div className="offer__image-wrapper" key={image}>
                <img className="offer__image" src={image} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offerInfo?.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}

            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offerInfo?.title}</h1>
              <button className={classNames('offer__bookmark-button', 'button', {'offer__bookmark-button--active': offerInfo?.isFavorite})} type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${getRating(offerInfo?.rating ?? 0)}%`}} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offerInfo?.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(offerInfo?.type ?? '')}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {offerInfo?.bedrooms ?? 0} {offerInfo?.bedrooms && offerInfo?.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offerInfo?.maxAdults ?? 0} {offerInfo?.maxAdults && offerInfo?.maxAdults > 1 ? 'adults' : 'adult'}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offerInfo?.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offerInfo?.goods.map((good) => (
                  <li className="offer__inside-item" key={good}>{good}</li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro': offerInfo?.host.isPro})}>
                  <img className="offer__avatar user__avatar" src={offerInfo?.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                </div>
                <span className="offer__user-name">{offerInfo?.host.name}</span>
                {offerInfo?.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">{offerInfo?.description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">{comments.length}</span></h2>
              <ListComments comments={comments}/>
              <OfferCommentForm />
            </section>
          </div>
        </div>
        <Map extraClass='offer' city={offerInfo.city} offers={nearOffersAndCurrent} selectedOfferId={offerInfo.id}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <ListOffers offers={nearOffers} listBlock='near-places__list' block='near-places' />
        </section>
      </div>
    </Container>
  );
}

export default OfferPage;
