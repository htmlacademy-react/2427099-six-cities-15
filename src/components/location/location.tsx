import classNames from 'classnames';
import { Link } from 'react-router-dom';

type TLocationProps = {
  location: string;
  isActive: boolean;
  onActiveChange: (location: string) => void;
}

function Location({ location, isActive, onActiveChange }: TLocationProps): JSX.Element {
  return (
    <li className="locations__item">
      <Link
        className={classNames('locations__item-link tabs__item', { 'tabs__item--active': isActive })}
        to="#"
        onClick={() => onActiveChange(location)}
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}

export default Location;
