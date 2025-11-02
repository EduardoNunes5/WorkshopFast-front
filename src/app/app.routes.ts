import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WorkshopAttendanceComponent } from './pages/workshop-attendance/workshop-attendance.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: 'Workshops'
  },
  {
    path: "workshops/:id/atas",
    component: WorkshopAttendanceComponent,
    title: 'atas'
  }
];
