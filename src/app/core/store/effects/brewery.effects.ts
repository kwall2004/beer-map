import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { BreweryService } from '../../services';
import { BreweryActions } from '../actions';

@Injectable()
export class BreweryEffects {
  constructor(private actions$: Actions, private breweryService: BreweryService) {}

  createValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BreweryActions.createValue),
      mergeMap(action =>
        this.breweryService.post(action.value).pipe(
          map(value => BreweryActions.storeValue({ value })),
          catchError(response => {
            console.error(response);
            return [];
          })
        )
      )
    )
  );

  readValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BreweryActions.readValues),
      mergeMap(() =>
        this.breweryService.get().pipe(
          map(values => BreweryActions.storeValues({ values })),
          catchError(response => {
            console.error(response);
            return [];
          })
        )
      )
    )
  );
}
