import { Component, OnInit, OnDestroy } from '@angular/core';
import { Entry } from 'src/app/data/models/accountant/entry';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bankCards-entry',
  templateUrl: './bankCards-entry.component.html',
  styleUrls: ['./bankCards-entry.component.css']
})
export class BankCardsEntryComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  bankcardEntries: Entry[];
  
  constructor(private route: ActivatedRoute, private alertService: ToastrService
  ,private entryService: EntryService) { }

  ngOnInit() {
    this.loadBancardEntries();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadBancardEntries() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.bankcardEntries = data.entries;
        console.log(data.entries)
      })
    );
  }
}
