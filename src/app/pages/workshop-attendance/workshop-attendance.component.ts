import { Component, OnInit } from '@angular/core';
import { Workshop } from '../../models/workshop/workshop';
import { Navigation, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from "../../components/card/card.component";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workshop-attendance',
  imports: [MatCardModule, CardComponent, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './workshop-attendance.component.html',
  styleUrl: './workshop-attendance.component.css'
})
export class WorkshopAttendanceComponent implements OnInit {

  workshop?: Workshop;
  columns = ['id', 'name', 'workshopAttendanceId', 'action'];


  private navigation: Navigation | null;

  constructor(private router: Router) {
    this.navigation = router.getCurrentNavigation();
   }

  ngOnInit(): void {

    if(this.navigation && this.navigation.extras.state && this.navigation.extras.state['workshopData']) {
      this.workshop = this.navigation.extras.state['workshopData'];
    } else {
      console.log(this.navigation?.extras.state)
      console.warn('No workshop data found!');
    }
  }

  removeCollaboratorFromWorkshopAttendance(workshopAttendanceId: number, collaboratorId: number) {

  }


}
