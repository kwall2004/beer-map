import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared';

import { MapComponent } from './map/map.component';

export const routes: Routes = [
  {
    path: 'map',
    component: MapComponent
  }
];

@NgModule({
  declarations: [MapComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class BreweryModule {}
