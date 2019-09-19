import { NgModule } from '@angular/core';

import * as Material from '@angular/material';
import { CommonModule } from '@angular/common';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDatepickerModule, MatSlideToggleModule, MatMenuModule, MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS, MatChipsModule, MatTableModule } from '@angular/material';

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
      MatSlideToggleModule,
      MatMenuModule,
      MatRadioModule,
      MatChipsModule,
      MatTableModule
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
     MatSlideToggleModule,
     MatMenuModule,
     MatRadioModule,
     MatChipsModule,
     MatTableModule
   ], providers: [{
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
   }]
})
export class UserMaterialModule { }
