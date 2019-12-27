import { Component, Input } from '@angular/core';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-input-mp',
  templateUrl: './input-mp.component.html',
  styleUrls: ['./input-mp.component.css']
})
export class InputMpComponent{

  constructor(private alertService: ToastrService) { }
  
  @Input() type: UiType;
  @Input() disabled: boolean;
  @Input() text: string;
  @Input() placeHolder: string;
  @Input() isForCopy: boolean;
   //ft-copy 
  @Input() icon: string;
  @Input() iconColor: UiType;
  @Input() event: Function;

  onClick() {
    this.event();
  }

  onCopied() {
    this.alertService.info('', 'کپی شد');
  }

}
