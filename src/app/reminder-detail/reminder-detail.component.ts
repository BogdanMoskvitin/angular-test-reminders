import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reminder-detail',
  templateUrl: './reminder-detail.component.html',
  styleUrls: [ './reminder-detail.component.css' ]
})
export class ReminderDetailComponent implements OnInit {
  reminder: Reminder | undefined;
  myForm : FormGroup;

  constructor(
    private route: ActivatedRoute,
    private reminderService: ReminderService,
    private location: Location
  ) {
    this.myForm = new FormGroup({    
      "text": new FormControl("", Validators.required),
      "hour": new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.max(23)]),
      "min": new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.max(59)]),
      "sec": new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.max(59)])
    });
  }

  ngOnInit(): void {
    this.getReminder();
  }

  getReminder(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.reminderService.getReminder(id)
      .subscribe(reminder => this.reminder = reminder);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.reminder) {
      this.reminderService.updateReminder(this.reminder)
        .subscribe(() => this.goBack());
    }
  }
}