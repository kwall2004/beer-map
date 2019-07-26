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

  values: Models.Brewery[] = [];
  selectedValues: Models.Brewery[] = [];

  constructor(private store: Store<CoreState>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.dispatch(BreweryActions.readValues());

    this.store
      .select(BrewerySelectors.values)
      .pipe(
        skipWhile(values => !values || !values.length),
        takeUntil(this.isDestroyed$)
      )
      .subscribe({
        next: values => {
          console.log(values);
          this.values = values;
          this.selectedValues = values;
          this.cd.detectChanges();
        }
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

  onCardClick(value: Models.Brewery) {
    this.selectedValues = [value];
  }
}
