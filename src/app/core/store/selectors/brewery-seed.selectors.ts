import { createSelector } from '@ngrx/store';

import { brewerySeedFeatureSelector } from '../reducers';
import { State } from '../reducers/brewery.reducer';

export namespace BrewerySeedSelectors {
  export const values = createSelector(
    brewerySeedFeatureSelector,
    (state: State) => state && state.values
  );
}
