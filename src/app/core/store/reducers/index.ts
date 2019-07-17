import * as fromRouterStore from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';

import * as fromBrewery from './brewery.reducer';
import * as fromRouter from './router.reducer';

export interface CoreState {
  router: fromRouterStore.RouterReducerState<fromRouter.RouterState>;
  brewery: fromBrewery.State;
}

export const reducers: ActionReducerMap<CoreState> = {
  router: fromRouterStore.routerReducer,
  brewery: fromBrewery.reducer
};

export const metaReducers: MetaReducer<CoreState>[] = !environment.production ? [] : [];

export const breweryFeatureSelector = createFeatureSelector<fromBrewery.State>('brewery');
