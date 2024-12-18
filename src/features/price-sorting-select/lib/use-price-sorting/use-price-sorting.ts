import { useAppSelector, useAppDispatch } from '@shared/lib/store';
import { OfferSortType } from '@features/price-sorting-select/model/types';
import { changeSorting, getPriceSortingType } from '../../model/price-sorting-select-slice';
import { useCallback } from 'react';

type UsePriceSortingReturn = {
  activeSotingType: OfferSortType;
  changeActiveSortType: (newSortType: OfferSortType) => void;
};

export function usePriceSorting(): UsePriceSortingReturn {
  const storedSortType = useAppSelector(getPriceSortingType);
  const dispatch = useAppDispatch();

  const changeActiveSorting = useCallback(
    (newSorting: OfferSortType) => {
      if (storedSortType !== newSorting) {
        dispatch(changeSorting(newSorting));
      }
    },
    [dispatch, storedSortType]
  );

  return {
    activeSotingType: storedSortType,
    changeActiveSortType: changeActiveSorting
  };
}
