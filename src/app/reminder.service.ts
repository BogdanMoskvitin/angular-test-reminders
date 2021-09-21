import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reminder } from './reminder';

@Injectable({ providedIn: 'root' })
export class ReminderService {

  private remindersUrl = 'api/reminders';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getReminders(): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(this.remindersUrl)
  }
  getReminder(id: number): Observable<Reminder> {
    const url = `${this.remindersUrl}/${id}`;
    return this.http.get<Reminder>(url)
  }
  addReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.post<Reminder>(this.remindersUrl, reminder, this.httpOptions)
  }
  deleteReminder(id: number): Observable<Reminder> {
    const url = `${this.remindersUrl}/${id}`;
    return this.http.delete<Reminder>(url, this.httpOptions)
  }
  updateReminder(reminder: Reminder): Observable<any> {
    return this.http.put(this.remindersUrl, reminder, this.httpOptions)
  }
}