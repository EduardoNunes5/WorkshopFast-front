import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { WorkshopAttendanceService } from '../../services/workshop-attendance.service';
import { WorkshopTableItem } from '../../models/workshop/workshop-table';

@Component({
  selector: 'app-home',
  imports: [CardComponent, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  columns: string[] = ['id', 'name', 'realizationDate', 'totalCollaborators', 'action'];

  workshopTableItems: WorkshopTableItem[] = [];

  constructor(private workshopAttendanceService: WorkshopAttendanceService) {}

  ngOnInit(): void {
      this.workshopAttendanceService.findAllV2().subscribe(response => {
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


}
