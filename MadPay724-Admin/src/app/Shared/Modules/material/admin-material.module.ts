import { NgModule } from '@angular/core';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MaterialFileInputModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSlideToggleModule
    ],
    exports: [
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MaterialFileInputModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSlideToggleModule
    ]
})
export class AdminMaterialModule { }
