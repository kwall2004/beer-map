import { Action, createReducer, on } from '@ngrx/store';

import * as Models from '../../models';
import { BreweryActions } from '../actions';

export interface State {
  values: Models.Brewery[];
}

export const INITIAL_STATE: State = {
  values: []
};

export function reducer(_state: State | undefined, _action: Action) {
  return createReducer(
    INITIAL_STATE,

    on(BreweryActions.storeValues, (state, action) => ({
      ...state,
      values: action.values
    })),

    on(BreweryActions.storeValue, (state, action) => ({
      ...state,
      values: state.values.concat(action.value)
    }))
  )(_state, _action);
}
