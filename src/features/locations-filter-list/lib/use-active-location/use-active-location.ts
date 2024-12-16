import { useCallback, useEffect } from 'react';
import type { OfferCityName } from '@entities/offer';
import { useAppSelector, useAppDispatch } from '@shared/lib/store';
import { changeLocation, getActiveLocation } from '@features/locations-filter-list/model';

type UseActiveLocationReturn = {
  activeLocation: OfferCityName;
  changeActiveLocation: (newLocation: OfferCityName) => void;
}

export function useActiveLocation(initLocation: OfferCityName): UseActiveLocationReturn {
  const storedLocation = useAppSelector(getActiveLocation);
  const dispatch = useAppDispatch();

  const changeActiveLocation = useCallback(
    (newLocation: OfferCityName) => {
      if (storedLocation !== newLocation) {
        dispatch(changeLocation(newLocation));
      }
    },
    [dispatch, storedLocation]
  );

  useEffect(
    () => {
      changeActiveLocation(initLocation);
    },
    [changeActiveLocation, initLocation]
  );

  return {
    activeLocation: storedLocation,
    changeActiveLocation
  };
}
