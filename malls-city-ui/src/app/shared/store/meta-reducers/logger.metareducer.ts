import { ActionReducer } from '@ngrx/store';

export function loggerMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    console.log('%c Previous State:', 'color: gray', state);
    console.log('%c Action:', 'color: blue', action);

    const nextState = reducer(state, action);

    console.log('%c Next State:', 'color: green', nextState);
    return nextState;
  };
}
