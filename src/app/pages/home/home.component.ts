import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { WorkshopAttendanceService } from '../../services/workshop-attendance.service';
import { WorkshopTableItem } from '../../models/workshop/workshop-table-item';
import { Workshop } from '../../models/workshop/workshop';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [CardComponent, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  columns: string[] = ['id', 'name', 'realizationDate', 'totalCollaborators', 'action'];

  workshopTableItems: WorkshopTableItem[] = [];
  workshops: Workshop[] = [];

  constructor(
    private workshopAttendanceService: WorkshopAttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.workshopAttendanceService.findAllV2().subscribe(response => {
        this.workshops = response;
        this.workshopTableItems = response.map(workshopAttendance => {
          return {
            id: workshopAttendance.id,
            name: workshopAttendance.name,
            realizationDate: workshopAttendance.realizationDate,
            totalCollaborators: workshopAttendance.collaborators?.length ?? 0
          }
        })
      })
  }

  goToWorkshopDetails(workshopId: number) {
    const foundWorkshop = this.workshops.find(workshop => workshop.id == workshopId);

    console.log("passando: " + JSON.stringify(foundWorkshop));

    this.router.navigate(['/workshops', foundWorkshop?.id, 'atas'], {
      state: {
        workshopData: foundWorkshop
      }
    })
  }


}
