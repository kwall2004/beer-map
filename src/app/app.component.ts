import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { BrewerySeedActions } from './core/store/actions';
import { CoreState } from './core/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<CoreState>) {}

  onSeedClick() {
    this.store.dispatch(BrewerySeedActions.read());
  }
}
