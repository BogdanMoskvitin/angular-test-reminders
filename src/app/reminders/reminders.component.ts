import { Component, OnInit } from '@angular/core';

import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  reminders: Reminder[] = [];
  message: string;
  isOpen = false;
  isId: number;
  myForm : FormGroup;
  constructor(private reminderService: ReminderService){
    this.myForm = new FormGroup({    
      "text": new FormControl("", Validators.required),
      "hour": new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.max(23)]),
      "min": new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.max(59)]),
      "sec": new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.max(59)])
    });
  }

  ngOnInit() {
    this.getReminders();
    setInterval(() => {
      this.timer(); 
    }, 1000);
  }

  getReminders(): void {
    this.reminderService.getReminders()
    .subscribe(reminders => this.reminders = reminders);
  }

  add(text: string, hour: string, min: string, sec: string): void {
    text = text.trim();
    hour = hour.trim();
    min = min.trim();
    sec = sec.trim();

    if (hour.length == 1) { hour = '0' + hour }
    if (min.length == 1) { min = '0' + min }
    if (sec.length == 1) { sec = '0' + sec }

    this.reminderService.addReminder({ text, hour, min, sec } as Reminder)
      .subscribe(reminder => {
        this.reminders.push(reminder);
      });
  }

  delete(reminder: Reminder): void {
    this.reminders = this.reminders.filter(h => h !== reminder);
    this.reminderService.deleteReminder(reminder.id).subscribe();
  }

  timer(){
    for(let i = 0; i<this.reminders.length; i++){
      let hour = +this.reminders[i].hour;
      let minute = +this.reminders[i].min;
      let sec = +this.reminders[i].sec;

      let date = new Date();
      if(hour == date.getHours() && minute == date.getMinutes() && sec == date.getSeconds()) {
        console.log('time out!', this.reminders[i].text);
        this.message = this.reminders[i].text;
        this.isOpen = true;
        this.isId = this.reminders[i].id;
      }
    }
  }

  showWindow(){
    this.message == '';
    this.isOpen = false;
  }
}