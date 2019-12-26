import { Component, Input } from '@angular/core';
import { UiType } from 'src/app/data/enums/uiType.enum';

@Component({
  selector: 'app-checkbox-mp',
  templateUrl: './checkbox-mp.component.html',
  styleUrls: ['./checkbox-mp.component.css']
})
export class CheckboxMPComponent  {
  @Input() text: string;
  @Input() type: UiType;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() event: Function;

  onChange($event) {
    this.event();
  }

}
