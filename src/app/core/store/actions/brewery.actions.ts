import { createAction, props } from '@ngrx/store';

import * as Models from '../../models';

export namespace BreweryActions {
  export const readValues = createAction('[brewery] READ_VALUES');

  export const storeValues = createAction(
    '[brewery] STORE_VALUES',
    props<{ values: Models.Brewery[] }>()
  );
}
