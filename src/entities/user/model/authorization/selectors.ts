import type { RootState } from '@shared/lib/store';

type AuthorizationSliceState = Pick<RootState, 'authorization'>;

export const authorizationStatusSelector = (state: AuthorizationSliceState) => state.authorization.status;
export const authorizedUserSelector = (state: AuthorizationSliceState) => state.authorization.user;
