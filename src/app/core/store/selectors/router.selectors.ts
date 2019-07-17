import { createSelector } from '@ngrx/store';

import { routerFeatureSelector } from '../reducers/router.reducer';

export namespace RouterSelectors {
  export const url = createSelector(
    routerFeatureSelector,
    state => state && state.state && state.state.url
  );

  export const params = createSelector(
    routerFeatureSelector,
    state => state && state.state && state.state.params
  );

  export const queryParams = createSelector(
    routerFeatureSelector,
    state => state && state.state && state.state.queryParams
  );

  export const fragment = createSelector(
    routerFeatureSelector,
    state => state && state.state && state.state.fragment
  );

  export const data = createSelector(
    routerFeatureSelector,
    state => state && state.state && state.state.data
  );
}
