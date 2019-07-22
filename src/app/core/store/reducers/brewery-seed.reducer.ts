import { Action, createReducer, on } from '@ngrx/store';

import { BrewerySeedActions } from '../actions';

export interface State {
  values: any[];
}

export const INITIAL_STATE: State = {
  values: []
};

export function reducer(_state: State | undefined, _action: Action) {
  return createReducer(
    INITIAL_STATE,

    on(BrewerySeedActions.store, (state, action) => ({
      ...state,
      values: state.values.concat(action.values)
    }))
  )(_state, _action);
}
