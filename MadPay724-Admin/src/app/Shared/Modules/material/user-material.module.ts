import { NgModule } from '@angular/core';

import * as Material from '@angular/material';
import { CommonModule } from '@angular/common';

import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  imports: [
     CommonModule,
     Material.MatCheckboxModule,
     Material.MatButtonModule,
     Material.MatInputModule,
     Material.MatSelectModule,
     Material.MatDialogModule,
     Material.MatFormFieldModule,
     MaterialFileInputModule
  ],
  exports: [
     Material.MatCheckboxModule,
     Material.MatButtonModule,
     Material.MatInputModule,
     Material.MatSelectModule,
     Material.MatDialogModule,
     Material.MatFormFieldModule,
     MaterialFileInputModule
  ]
})
export class UserMaterialModule { }
