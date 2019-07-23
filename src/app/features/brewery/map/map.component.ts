import { MapsAPILoader } from '@agm/core';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, skipWhile, takeUntil, tap } from 'rxjs/operators';

import { BrewerySelectors } from '../../../../app/core/store/selectors';
import * as Models from '../../../core/models';
import { BreweryActions } from '../../../core/store/actions';
import { CoreState } from '../../../core/store/reducers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject();
  private previousInfoWindow: InfoWindow;
  private geocoder: google.maps.Geocoder;
  private value$ = new Subject<Models.Brewery>();

  values: Models.Brewery[] = [];

  constructor(private store: Store<CoreState>, private cd: ChangeDetectorRef, private mapsApiLoader: MapsAPILoader) {}

  ngOnInit() {
    this.store.dispatch(BreweryActions.read());

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();

      this.store
        .select(BrewerySelectors.values)
        .pipe(
          skipWhile(values => !values || !values.length),
          takeUntil(this.isDestroyed$)
        )
        .subscribe({
          next: values => {
            console.log(values);

            this.value$
              .pipe(
                mergeMap(v => {
                  const address = `${v.street}, ${v.city}, ${v.state} ${v.postalCode}, ${v.country}`;

                  return new Observable(observer =>
                    this.geocoder.geocode({ address }, (results, status) => {
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
                        location: {
                          latitude: results[0].geometry.location.lat(),
                          longitude: results[0].geometry.location.lng()
                        }
                      });
                    })
                  ).pipe(
                    retryWhen(errors =>
                      errors.pipe(
                        delay(10000),
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

                  this.values.push(v as Models.Brewery);

                  this.cd.detectChanges();
                }
              });

            values.forEach(v => this.value$.next(v));
            this.value$.complete();
          }
        });
    });
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }

  onMarkerClick(currentInfoWindow: InfoWindow) {
    if (this.previousInfoWindow) {
      this.previousInfoWindow.close();
    }

    this.previousInfoWindow = currentInfoWindow;
  }
}
