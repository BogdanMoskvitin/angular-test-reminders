import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RemindersComponent } from './reminders/reminders.component';
import { ReminderDetailComponent } from './reminder-detail/reminder-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/reminders', pathMatch: 'full' },
  { path: 'detail/:id', component: ReminderDetailComponent },
  { path: 'reminders', component: RemindersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
