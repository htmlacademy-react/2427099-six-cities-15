import { NavLink } from 'react-router-dom';

type TLocationProps = {
  location: string;
  isActive: boolean;
  onActiveChange: (location: string) => void;
}

function Location({ location, isActive, onActiveChange }: TLocationProps): JSX.Element {
  return (
    <li className="locations__item">
      <NavLink
        className={`locations__item-link tabs__item ${isActive ? ' tabs__item--active' : ''}`}
        to="#"
        onClick={() => onActiveChange(location)}
      >
        <span>{location}</span>
      </NavLink>
    </li>
  );
}

export default Location;
