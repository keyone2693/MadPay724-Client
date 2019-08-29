import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TicketContent } from 'src/app/models/ticketContent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/Services/panel/user/ticket.service';

@Component({
  selector: 'app-chat-ticket',
  templateUrl: './chat-ticket.component.html',
  styleUrls: ['./chat-ticket.component.css']
})
export class ChatTicketComponent implements OnInit {
  @Input() ticketContents: TicketContent[];
  @Input() ticketId: string;
  @Input() ticketClosed: string;
  @Output() newTicketContent = new EventEmitter<TicketContent>();
  slectedFile: File = null;
  selected = false;
  fileName = '';
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private alertService: ToastrService, private ticketService: TicketService) { }

  ticketContentForm: FormGroup = this.formBuilder.group({
    text: ['', [Validators.required, Validators.maxLength(1000)]]
  });
  ngOnInit() {
  }
  onFileSelect(file) {
    if (file.target.files[0]) {
      this.slectedFile = file.target.files[0] as File;
      const reader = new FileReader();
      reader.readAsDataURL(this.slectedFile);
      this.selected = true;
      this.fileName = this.slectedFile.name;
    }
  }
  onClear() {
    this.ticketContentForm.reset();
    this.slectedFile = null;
  }
  onSubmitCreate() {
    if (this.ticketContentForm.valid) {
      const ticketContent = new FormData();
      if (this.slectedFile !== null) {
        ticketContent.append('file', this.slectedFile, this.slectedFile.name);
      }
      ticketContent.append('text', this.ticketContentForm.get('text').value);
      this.ticketService.addTicketContent(
         ticketContent,
         this.authService.decodedToken.nameid,
         this.ticketId
         ).subscribe((data) => {
        this.alertService.success('  با موفقیت ارسال شد', 'موفق');
        this.onClear();
        this.newTicketContent.emit(data);
      }, error => {
        this.alertService.error(error, 'خطا در ثبت تیکت جدید');
      });
    } else {
      this.alertService.warning('اطلاعات تیکت را به درستی وارد کنید', 'خطا');
    }
  }
}
