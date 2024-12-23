import { Nullable } from './nullable';

type StateError = {
  code: number | string;
  message: string;
}

export type LoadableState<TStateType> = {
  loading: boolean;
  value: TStateType;
  error: Nullable<StateError>;
}
