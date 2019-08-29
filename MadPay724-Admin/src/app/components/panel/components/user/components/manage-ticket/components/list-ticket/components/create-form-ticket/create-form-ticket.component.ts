import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TicketService } from 'src/app/Services/panel/user/ticket.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-form-ticket',
  templateUrl: './create-form-ticket.component.html',
  styleUrls: ['./create-form-ticket.component.css']
})
export class CreateFormTicketComponent implements OnInit {
  @Output() newTicket = new EventEmitter<Ticket>();
  ticket: Ticket;
  constructor(private formBuilder: FormBuilder, private matdialogRef: MatDialogRef<CreateFormTicketComponent>,
              private ticketService: TicketService, private authService: AuthService,
              private alertService: ToastrService) { }

  ticketForm: FormGroup = this.formBuilder.group({
    id: [],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    department: ['', [Validators.required]],
    level: [''],
    text: ['', [Validators.required, Validators.maxLength(1000)]],
    file: ['']
  });
  ngOnInit() {
  }
  onClear() {
    this.ticketForm.reset();
    this.matdialogRef.close();
  }
  onSubmitAdd() {
    if (this.ticketForm.valid) {
      this.ticketService.addTicket(this.ticketForm.value, this.authService.decodedToken.nameid).subscribe((data) => {
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
