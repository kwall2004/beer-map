import * as Models from '../../models';
import { BreweryActions } from '../actions';

import { INITIAL_STATE, reducer } from './brewery.reducer';

describe('app reducer', () => {
  it('has initial state', () => {
    expect(INITIAL_STATE).toEqual({
      loading: 0
    });
  });

  it('handles store', () => {
    const state = reducer(undefined, BreweryActions.store({ values: [{}] as Models.Brewery[] }));

    expect(state).toEqual({
      ...INITIAL_STATE,
      values: [{}]
    });
  });
});
