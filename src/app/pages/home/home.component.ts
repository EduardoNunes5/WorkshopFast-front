import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

import { WorkshopAttendanceService } from '../../services/workshop-attendance.service';
import { WorkshopTableItem } from '../../models/workshop/workshop-table-item';
import { Workshop } from '../../models/workshop/workshop';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { TableData } from '../../models/table/data';
import { ColumnType } from '../../models/table/column';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  columns: string[] = [
    'id',
    'name',
    'realizationDate',
    'totalCollaborators',
    'action',
  ];

  protected workshopTableItems: WorkshopTableItem[] = [];
  protected tableData = {} as TableData<WorkshopTableItem>;
  private workshops: Workshop[] = [];

  constructor(
    private workshopAttendanceService: WorkshopAttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.workshopAttendanceService.findAllV2().subscribe((response) => {
      this.workshops = response;
      this.workshopTableItems = response.map((workshopAttendance) => {
        return {
          id: workshopAttendance.id,
          name: workshopAttendance.name,
          realizationDate: workshopAttendance.realizationDate,
          totalCollaborators: workshopAttendance.collaborators?.length ?? 0,
        };
      });

      this.tableData = {
        action: {
          name: 'visualizar',
          action: this.goToWorkshopDetails.bind(this),
        },
        data: of(this.workshopTableItems),
        columns: [
          {
            title: 'Id',
            name: 'id',
            columnType: ColumnType.Data,
          },
          {
            title: 'Nome',
            name: 'name',
            columnType: ColumnType.Data,
          },
          {
            title: 'Data',
            name: 'realizationDate',
            columnType: ColumnType.Data,
          },
          {
            title: 'Total de colaboradores',
            name: 'totalCollaborators',
            columnType: ColumnType.Data,
          },
          {
            title: 'Ação',
            name: 'action',
            columnType: ColumnType.Action,
          },
        ],
      };

      this.tableData.action = {
        name: 'visualizar',
        action: this.goToWorkshopDetails.bind(this),
      };
    });
  }

  goToWorkshopDetails(event: WorkshopTableItem) {
    const foundWorkshop = this.workshops.find(
      (workshop) => workshop.id == event.id
    );

    console.log('passando: ' + JSON.stringify(foundWorkshop));

    this.router.navigate(['/workshops', foundWorkshop?.id, 'atas'], {
      state: {
        workshopData: foundWorkshop,
      },
    });
  }
}
