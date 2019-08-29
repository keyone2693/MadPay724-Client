import { NgModule } from '@angular/core';

import * as Material from '@angular/material';
import { CommonModule } from '@angular/common';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDatepickerModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [
     CommonModule,
     Material.MatCheckboxModule,
     Material.MatButtonModule,
     Material.MatInputModule,
     Material.MatSelectModule,
     Material.MatDialogModule,
     Material.MatFormFieldModule,
     MaterialFileInputModule,
     MatDatepickerModule,
     MatSlideToggleModule
  ],
  exports: [
     Material.MatCheckboxModule,
     Material.MatButtonModule,
     Material.MatInputModule,
     Material.MatSelectModule,
     Material.MatDialogModule,
     Material.MatFormFieldModule,
     MaterialFileInputModule,
     MatDatepickerModule,
     MatSlideToggleModule
  ]
})
export class UserMaterialModule { }
