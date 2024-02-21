import Card from '../card/card';

function FavoriteLocation(): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <Card isFavoriteCard isPremium isActive />
        <Card isFavoriteCard isPremium={false} />
      </div>
    </li>
  );
}

export default FavoriteLocation;
