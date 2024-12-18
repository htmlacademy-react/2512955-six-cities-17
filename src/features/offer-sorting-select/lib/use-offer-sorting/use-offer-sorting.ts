import { useAppSelector, useAppDispatch } from '@shared/lib/store';
import { OfferSortType } from '@features/offer-sorting-select/model/types';
import { changeSorting, getOfferSortingType } from '../../model/offer-sorting-select-slice';
import { useCallback } from 'react';

type UseOfferSortingReturn = {
  activeSotingType: OfferSortType;
  changeActiveSortType: (newSortType: OfferSortType) => void;
};

export function useOfferSorting(): UseOfferSortingReturn {
  const storedSortType = useAppSelector(getOfferSortingType);
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
