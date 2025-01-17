import { Nullable } from './nullable';

export type StateError = {
  code: number | string;
  message: string;
}

export type LoadableState<TStateType> = {
  loading: boolean;
  value: TStateType;
  error: Nullable<StateError>;
}

export interface BaseFetchedState {
  error: Nullable<StateError>;
}
