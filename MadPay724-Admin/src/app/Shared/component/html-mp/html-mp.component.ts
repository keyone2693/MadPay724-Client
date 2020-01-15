import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-html-mp',
  templateUrl: './html-mp.component.html',
  styleUrls: ['./html-mp.component.css']
})
export class HtmlMpComponent{
  @Input() html: string;
  @Input() isTooltip: boolean = false;
  @Input() isBadge: boolean = false;
  @Input() isImage: boolean = false;
  @Input() tooltipText: string;
  @Input() tooltipPosition: string;
  @Input() text: string;
  @Input() class: string;

}
