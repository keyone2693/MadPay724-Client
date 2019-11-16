import { NgModule } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  imports: [
    TabModule,
    RichTextEditorAllModule,
    CheckBoxModule,
    DialogModule,
    NumericTextBoxModule,
    ButtonModule,
    SwitchModule,
    RadioButtonModule,
    TextBoxModule,
    DropDownListModule
  ],
  exports: [
    TabModule,
    RichTextEditorAllModule,
    CheckBoxModule,
    DialogModule,
    NumericTextBoxModule,
    ButtonModule,
    SwitchModule,
    RadioButtonModule,
    TextBoxModule,
    DropDownListModule
  ],
})
export class SharedEJTextEditorModule { }
