import { Nullable } from './nullable';

export type StateError = {
  code: string;
  message: string;
}

export interface BaseFetchedState {
  loading: boolean;
  error: Nullable<StateError>;
}
