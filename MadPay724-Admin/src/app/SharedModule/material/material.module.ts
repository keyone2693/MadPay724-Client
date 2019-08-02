import { NgModule } from '@angular/core';

import * as Material from '@angular/material';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule
  ],
  exports: [
    Material.MatCheckboxModule,
    Material.MatButtonModule
  ]
})
export class MaterialModule { }
