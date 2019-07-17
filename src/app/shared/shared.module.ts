import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from './angular-material';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularMaterialModule],
  exports: [CommonModule, AngularMaterialModule]
})
export class SharedModule {}
