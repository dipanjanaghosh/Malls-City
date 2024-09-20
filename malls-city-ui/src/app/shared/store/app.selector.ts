import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.model';

export const getAppState = createFeatureSelector<AppState>('appState');

export const getCities = createSelector(getAppState, (state) => state.cities);
