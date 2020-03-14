import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/core/_services/panel/user/ticket.service';
import { Ticket } from 'src/app/data/models/ticket';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-form-ticket',
  templateUrl: './create-form-ticket.component.html',
  styleUrls: ['./create-form-ticket.component.css']
})
export class CreateFormTicketComponent implements OnInit {
  @Output() newTicket = new EventEmitter<Ticket>();
  slectedFile: File = null;
  selected = false;
  fileName = '';
  constructor(private formBuilder: FormBuilder, private matdialogRef: MatDialogRef<CreateFormTicketComponent>,
              private ticketService: TicketService,
              private alertService: ToastrService) { }

  ticketForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    department: ['', [Validators.required]],
    level: [''],
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
    this.ticketForm.reset();
    this.matdialogRef.close();
    this.slectedFile = null;
  }
  onSubmitCreate() {
    if (this.ticketForm.valid) {
      const ticket = new FormData();
      // document = Object.assign({}, this.docLeftForm.value);
      if (this.slectedFile !== null) {
        ticket.append('file', this.slectedFile, this.slectedFile.name);
      }
      ticket.append('title', this.ticketForm.get('title').value);
      ticket.append('department', this.ticketForm.get('department').value);
      ticket.append('level', this.ticketForm.get('level').value);
      ticket.append('text', this.ticketForm.get('text').value);
      this.ticketService.addTicket(ticket).subscribe((data) => {
        this.alertService.success('تیکتی شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
        this.newTicket.emit(data);
      }, error => {
        this.alertService.error(error, 'خطا در ثبت تیکت جدید');
      });
    } else {
      this.alertService.warning('اطلاعات تیکت را به درستی وارد کنید', 'خطا');
    }
  }
}
