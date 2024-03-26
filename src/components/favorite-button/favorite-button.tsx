import { AppRoute } from '@const';
import { useAppDispatch } from '@hooks/index';
import { getToken } from '@services/token';
import { changeFavoriteAction } from '@store/thunks/favorites';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type TFavoriteButtonProps = {
  extraClass?: 'offer' | 'place-card';
  isFavorite?: boolean;
  offerId: string;
  width?: number;
  height?: number;
}

function FavoriteButton({ extraClass = 'place-card', isFavorite = false, offerId, width = 18, height = 19 }: TFavoriteButtonProps): JSX.Element {
  const token = getToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bookmarksLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;
  const buttonClass = `${extraClass}__bookmark-button`;

  const handleFavoriteChange = () => {
    if (!token) {
      return navigate(AppRoute.Login);
    }

    dispatch(changeFavoriteAction({offerId, status: Number(!isFavorite)}));
  };

  return (
    <button
      className={classNames(buttonClass, 'button', {[`${buttonClass}--active`]: isFavorite})}
      type="button"
      onClick={handleFavoriteChange}
    >
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{bookmarksLabel}</span>
    </button>
  );
}

export default FavoriteButton;
