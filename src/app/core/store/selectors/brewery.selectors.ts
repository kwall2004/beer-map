import { createSelector } from '@ngrx/store';

import { breweryFeatureSelector } from '../reducers';
import { State } from '../reducers/brewery.reducer';

export namespace BrewerySelectors {
  export const values = createSelector(
    breweryFeatureSelector,
    (state: State) => state && state.values
  );
}
