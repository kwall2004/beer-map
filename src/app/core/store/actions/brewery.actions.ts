import { createAction, props } from '@ngrx/store';

import * as Models from '../../models';

export namespace BreweryActions {
  export const read = createAction('[brewery] READ');

  export const store = createAction(
    '[brewery] STORE',
    props<{ values: Models.Brewery[] }>()
  );
}
