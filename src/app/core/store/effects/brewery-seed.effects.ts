import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OpenBreweryDbService } from '../../services';
import { BrewerySeedActions } from '../actions';

@Injectable()
export class BrewerySeedEffects {
  constructor(private actions$: Actions, private breweryService: OpenBreweryDbService) {}

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrewerySeedActions.read),
      mergeMap(() =>
        this.breweryService.get().pipe(
          map(values => BrewerySeedActions.store({ values })),
          catchError(response => {
            console.error(response);
            return [];
          })
        )
      )
    )
  );
}
