import { useAppDispatch } from '@shared/lib/store';
import { setLoading as setLoadingAction } from '@shared/model/global-loader-slice';
import { useCallback } from 'react';

type UseGlobalLoaderReturn = (value: boolean) => void;

export function useGlobalLoader(): UseGlobalLoaderReturn {
  const dispatch = useAppDispatch();
  const setLoading = useCallback(
    (value: boolean) => dispatch(setLoadingAction(value)),
    [dispatch]
  );

  return setLoading;
}
