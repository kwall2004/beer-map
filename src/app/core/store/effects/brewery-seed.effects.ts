import { MapsAPILoader } from '@agm/core';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of, Subject } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen, tap } from 'rxjs/operators';

import * as Models from '../../models';
import { OpenBreweryDbService } from '../../services';
import { BreweryActions, BrewerySeedActions } from '../actions';

@Injectable()
export class BrewerySeedEffects {
  constructor(
    private actions$: Actions,
    private breweryService: OpenBreweryDbService,
    private mapsApiLoader: MapsAPILoader
  ) {}

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrewerySeedActions.read),
      mergeMap(() =>
        this.breweryService.get().pipe(
          mergeMap(seedValues => {
            return from(this.mapsApiLoader.load()).pipe(
              map(() => {
                const geocoder = new google.maps.Geocoder();
                const seedValue$ = of(seedValues);
                const values: Models.Brewery[] = [];

                seedValue$
                  .pipe(
                    mergeMap(v => {
                      const address = `${v.street}, ${v.city}, ${v.state} ${v.postalCode}, ${v.country}`;

                      return new Observable(observer =>
                        geocoder.geocode({ address }, (results, status) => {
                          if (status.toString() === 'OVER_QUERY_LIMIT') {
                            observer.error(status);
                            return;
                          }

                          if (status.toString() !== 'OK') {
                            observer.error(status);
                            return;
                          }

                          if (results.length !== 1) {
                            observer.error(results);
                            return;
                          }

                          observer.next({
                            ...v,
                            latitude: results[0].geometry.location.lat(),
                            longitude: results[0].geometry.location.lng()
                          });
                        })
                      ).pipe(
                        retryWhen(errors =>
                          errors.pipe(
                            delay(30000),
                            tap(error => console.log(error, 'retrying...'))
                          )
                        ),
                        catchError(error => {
                          console.log(error);
                          return [];
                        })
                      );
                    })
                  )
                  .subscribe({
                    next: v => {
                      console.log(v);

                      values.push(v as Models.Brewery);
                    }
                  });

                return BreweryActions.storeValues({ values });
              })
            );
          }),
          catchError(response => {
            console.error(response);
            return [];
          })
        )
      )
    )
  );
}
