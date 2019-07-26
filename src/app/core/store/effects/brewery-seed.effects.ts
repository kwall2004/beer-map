import { MapsAPILoader } from '@agm/core';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
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
        from(this.mapsApiLoader.load()).pipe(
          mergeMap(() => {
            const geocoder = new google.maps.Geocoder();
            let failures = [];

            return this.breweryService.get().pipe(
              mergeMap(seedValue => {
                const address = `${seedValue.street}, ${seedValue.city}, ${seedValue.state}, ${seedValue.country}`;

                return new Observable<Models.Brewery>(observer => {
                  geocoder.geocode({ address }, (results, status) => {
                    if (status.toString() === 'OVER_QUERY_LIMIT') {
                      observer.error(status);
                      return;
                    }

                    if (status.toString() !== 'OK') {
                      observer.error(status);
                      return;
                    }

                    let result = results[0];

                    if (results.length !== 1) {
                      result = results.find(r => r.types.includes('street_address'));

                      if (!result) {
                        observer.error(results);
                        return;
                      }
                    }

                    observer.next({
                      ...seedValue,
                      postalCode: result.address_components.find(c => c.types.includes('postal_code')).long_name,
                      latitude: result.geometry.location.lat(),
                      longitude: result.geometry.location.lng()
                    });
                  });
                }).pipe(
                  retryWhen(errors =>
                    errors.pipe(
                      tap(error => {
                        if (error !== 'OVER_QUERY_LIMIT') {
                          failures = failures.filter(f => f !== seedValue.id);
                          throw { error, address };
                        }

                        failures = failures.filter(f => f !== seedValue.id).concat(seedValue.id);
                        console.log(seedValue.name, error, 'retrying...');
                      }),
                      delay(10000)
                    )
                  ),
                  map(value => {
                    failures = failures.filter(f => f !== seedValue.id);
                    console.log(failures.length);

                    return BreweryActions.createValue({ value });
                  }),
                  catchError(response => {
                    console.error(response);
                    return [];
                  })
                );
              }),
              catchError(response => {
                console.error(response);
                return [];
              })
            );
          })
        )
      )
    )
  );
}
