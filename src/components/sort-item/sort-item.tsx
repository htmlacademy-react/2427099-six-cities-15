import classNames from 'classnames';

type TSortItemProps = {
  type: string;
  isSortSelected: boolean;
  onSortTypeClick: (name: string) => void;
}

function SortItem({type, isSortSelected, onSortTypeClick}: TSortItemProps): JSX.Element {
  return (
    <li
      className={classNames('places__option', { 'places__option--active': isSortSelected })}
      tabIndex={0}
      onClick={() => onSortTypeClick(type)}
    >
      {type}
    </li>
  );
}

export default SortItem;
