import { createAction, props } from '@ngrx/store';

import * as Models from '../../models';

export namespace BrewerySeedActions {
  export const read = createAction('[brewery-seed] READ');

  export const store = createAction(
    '[brewery-seed] STORE',
    props<{ values: Models.Brewery[] }>()
  );
}
