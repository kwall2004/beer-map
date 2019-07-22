import { MapsAPILoader } from '@agm/core';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';

import { BrewerySeedSelectors } from '../../../../app/core/store/selectors';
// import * as Models from '../../../core/models';
import { BrewerySeedActions } from '../../../core/store/actions';
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
  // private geocoder: google.maps.Geocoder;

  values = [];

  constructor(private store: Store<CoreState>, private cd: ChangeDetectorRef, private mapsApiLoader: MapsAPILoader) {}

  ngOnInit() {
    this.store.dispatch(BrewerySeedActions.read());

    this.mapsApiLoader.load().then(() => {
      // this.geocoder = new google.maps.Geocoder();

      this.store
        .select(BrewerySeedSelectors.values)
        .pipe(
          skipWhile(values => !values || !values.length),
          takeUntil(this.isDestroyed$)
        )
        .subscribe(values => {
          console.log(values);
          this.values = values;
          this.cd.detectChanges();

          // values.forEach(v => {
          //   const value = this.values.find(_v => _v.id === v.id);

          //   if (!!value) {
          //     return;
          //   }

          // setTimeout(() => {
          //   this.geocoder.geocode(
          //     {
          //       address: `${values[i].street}, ${values[i].city}, ${values[i].state} ${values[i].postalCode}, ${values[i].country}`
          //     },
          //     (results, status) => {
          //       if (status.toString() !== 'OK') {
          //         console.error(status);
          //         return;
          //       }

          //       if (results.length !== 1) {
          //         console.error(results);
          //         return;
          //       }

          //       this.values.push({
          //         ...v,
          //         location: {
          //           latitude: results[0].geometry.location.lat(),
          //           longitude: results[0].geometry.location.lng()
          //         }
          //       });

          //       this.cd.detectChanges();
          //     }
          //   );
          // }, i * 2000);
          // });
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
