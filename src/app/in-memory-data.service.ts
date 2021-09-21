import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Reminder } from './reminder';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const reminders = [];
    return {reminders};
  }

  genId(reminders: Reminder[]): number {
    return reminders.length > 0 ? Math.max(...reminders.map(reminder => reminder.id)) + 1 : 1;
  }
}
