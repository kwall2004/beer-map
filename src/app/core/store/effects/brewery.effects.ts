import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { BreweryService } from '../../services';
import { BreweryActions } from '../actions';

@Injectable()
export class BreweryEffects {
  constructor(private actions$: Actions, private breweryService: BreweryService) {}

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BreweryActions.read),
      mergeMap(() =>
        this.breweryService.get().pipe(
          map(values => BreweryActions.store({ values })),
          catchError(response => {
            console.error(response);
            return [];
          })
        )
      )
    )
  );
}
