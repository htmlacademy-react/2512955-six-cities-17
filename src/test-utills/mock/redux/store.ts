import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

export type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
