import { MetaReducer } from '@ngrx/store';
import { loggerMetaReducer } from './logger.metareducer';

export const appMetaReducers: MetaReducer[] = [loggerMetaReducer];
