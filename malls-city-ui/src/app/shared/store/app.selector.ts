import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateModel } from './app.model';

export const getAppState = createFeatureSelector<AppStateModel>('globalState');

export const getCities = createSelector(getAppState, (state) => state.cities);
