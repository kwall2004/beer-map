import { MapsAPILoader } from '@agm/core';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';

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
        .subscribe(values => {
          values.forEach((v, i) => {
            if (i > 49) {
              return;
            }

            const value = this.values.find(_v => _v.id === v.id);

            if (!!value) {
              return;
            }

            this.geocoder.geocode(
              {
                address: `${values[0].street}, ${values[0].city}, ${values[0].state} ${values[0].postalCode}, ${values[0].country}`
              },
              (results, status) => {
                if (status.toString() !== 'OK') {
                  console.error(status);
                  return;
                }

                if (results.length !== 1) {
                  console.error(results);
                  return;
                }

                this.values.push({
                  ...v,
                  location: {
                    latitude: results[0].geometry.location.lat(),
                    longitude: results[0].geometry.location.lng()
                  }
                });

                this.cd.detectChanges();
              }
            );
          });
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
