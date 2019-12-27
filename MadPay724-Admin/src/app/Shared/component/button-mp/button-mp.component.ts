import { Component, Input } from '@angular/core';
import { UiType } from 'src/app/data/enums/uiType.enum';

@Component({
  selector: 'app-button-mp',
  templateUrl: './button-mp.component.html',
  styleUrls: ['./button-mp.component.css']
})
export class ButtonMPComponent{
  @Input() type: UiType;
  @Input() text: string;
  @Input() icon: string;
  @Input() event: Function;

  onClick() {
    this.event();
  }

}
