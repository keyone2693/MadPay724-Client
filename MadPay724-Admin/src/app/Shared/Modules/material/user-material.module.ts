import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDatepickerModule, MatSlideToggleModule, MatMenuModule, MatRadioModule,
   MAT_RADIO_DEFAULT_OPTIONS, MatChipsModule, MatTableModule, MatCheckboxModule,
   MatPaginatorModule, MatSortModule, MatFormFieldModule, MatDialogModule,
   MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorIntl, MatTooltipModule
} from '@angular/material';
import { FaMatPaginatorIntl } from './faMatPaginatorIntl';

@NgModule({
  imports: [
     MatCheckboxModule,
     MatButtonModule,
     MatInputModule,
     MatSelectModule,
     MatDialogModule,
     MatFormFieldModule,
     MaterialFileInputModule,
     MatDatepickerModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatRadioModule,
      MatChipsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatTooltipModule
  ],
  exports: [
     MatCheckboxModule,
     MatButtonModule,
     MatInputModule,
     MatSelectModule,
     MatDialogModule,
     MatFormFieldModule,
     MaterialFileInputModule,
     MatDatepickerModule,
     MatSlideToggleModule,
     MatMenuModule,
     MatRadioModule,
     MatChipsModule,
     MatTableModule,
     MatPaginatorModule,
     MatSortModule,
     MatTooltipModule
   ], providers: [{
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
  },
     {
        provide: MatPaginatorIntl, useClass: FaMatPaginatorIntl
  }]
})
export class UserMaterialModule { }
