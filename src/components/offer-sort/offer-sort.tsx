import { SORT_TYPES } from '@const';
import classNames from 'classnames';
import { useState } from 'react';

function OfferSort() {
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);

  const handleSortBlockClick = () => {
    setIsSortOpened(!isSortOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortBlockClick}>
        Popular
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', isSortOpened && 'places__options--opened')}>
        {
          SORT_TYPES.map((type) => (
            <li className="places__option" tabIndex={0} key={type.name}>{type.name}</li>
          ))
        }
      </ul>
    </form>
  );
}

export default OfferSort;
