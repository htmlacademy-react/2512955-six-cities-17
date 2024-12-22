import { useAppSelector, useAppDispatch } from '@shared/lib/store';
import { getLoaderSelector, setLoading as setLoadingAction } from '@shared/model/global-loader-slice';
import { useCallback } from 'react';

type UseGlobalLoaderReturn = {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export function useGlobalLoader(): UseGlobalLoaderReturn {
  const loading = useAppSelector(getLoaderSelector);
  const dispatch = useAppDispatch();
  const setLoading = useCallback(
    (value: boolean) => {
      if (loading !== value) {
        dispatch(setLoadingAction(value));
      }
    },
    [dispatch, loading]
  );

  return {
    loading,
    setLoading
  };
}
