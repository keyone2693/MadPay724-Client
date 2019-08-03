import { NgModule } from '@angular/core';

import * as Material from '@angular/material';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatDialogModule
  ],
  exports: [
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatDialogModule
  ]
})
export class MaterialModule { }
