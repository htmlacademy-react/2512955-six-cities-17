import { ElementSize } from '@shared/types';
import classNames from 'classnames';
import { MouseEventHandler, useEffect, useState } from 'react';
import { SUPPORTED_SORTING_TYPES, sortTypeToCaptionMap } from '../../config/const';
import { usePriceSorting } from '@features/price-sorting-select/lib/use-price-sorting';

const ARROW_SIZE: ElementSize = {
  height: 4,
  width: 7
};

export function PriceSortingSelect(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const { activeSotingType, changeActiveSortType } = usePriceSorting();

  const selectOptionsListClassName = classNames(
    'places__options',
    'places__options--custom',
    {
      'places__options--opened': isOpened
    }
  );

  useEffect(
    () => {
      const closeSelect = () => setIsOpened(false);
      let componentIsRendered = false;
      if (!componentIsRendered) {
        document.addEventListener('click', closeSelect);
      }

      return () => {
        componentIsRendered = true;
        document.removeEventListener('click', closeSelect);
      };
    },
    []
  );

  const openSelectHandler: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation();
    setIsOpened((prev) => !prev);
  };

  return (
    <>
      <span className='places__sorting-type' tabIndex={0} onClick={openSelectHandler}>
        {sortTypeToCaptionMap.get(activeSotingType)}
        <svg className='places__sorting-arrow' width={ARROW_SIZE.width} height={ARROW_SIZE.height}>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={selectOptionsListClassName}>
        {SUPPORTED_SORTING_TYPES.map((current, index) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={`offer-sort-type-select-option-${index}`}
            className={classNames('places__option', {'places__option--active': activeSotingType === current})}
            tabIndex={0}
            onClick={() => changeActiveSortType(current)}
          >
            {sortTypeToCaptionMap.get(current)}
          </li>
        ))}
      </ul>
    </>
  );
}
