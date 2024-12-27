import type { RootState } from '@shared/lib/store';

export const authorizationSelector = (state: RootState) => state.authorization;
