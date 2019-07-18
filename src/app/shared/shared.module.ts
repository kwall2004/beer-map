import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';

import { AngularMaterialModule } from './angular-material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    })
  ],
  exports: [CommonModule, AngularMaterialModule, AgmCoreModule]
})
export class SharedModule {}
