import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
  fragment: string;
  data: Data;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterState>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

export const routerFeatureSelector = createFeatureSelector<fromRouter.RouterReducerState<RouterState>>('router');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterState> {
  serialize(snapshot: RouterStateSnapshot): RouterState {
    const { url } = snapshot;
    const { queryParams } = snapshot.root;

    let root: ActivatedRouteSnapshot = snapshot.root;
    while (root.firstChild) {
      root = root.firstChild;
    }
    const { params, fragment, data } = root;

    return { url, queryParams, params, fragment, data };
  }
}
