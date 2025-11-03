import { WorkshopAttendanceService } from './../../services/workshop-attendance.service';
import { Component, OnInit } from '@angular/core';
import { WorkshopWithCollaborators } from '../../models/workshop/workshop-collaborator';
import { Navigation, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { CollaboratorTableItem } from '../../models/collaborator/collaborator-table-item';
import { TableData } from '../../models/table/data';
import { of } from 'rxjs';
import { ColumnType } from '../../models/table/column';

@Component({
  selector: 'app-workshop-attendance',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    TableComponent,
  ],
  templateUrl: './workshop-attendance.component.html',
  styleUrl: './workshop-attendance.component.css',
})
export class WorkshopAttendanceComponent implements OnInit {
  workshop?: WorkshopWithCollaborators;
  columns = ['id', 'name', 'workshopAttendanceId', 'action'];

  protected collaboratorTableItems: CollaboratorTableItem[] = [];
  protected tableData = {} as TableData<CollaboratorTableItem>;

  private navigation: Navigation | null;

  constructor(private router: Router, private workshopAttendanceService: WorkshopAttendanceService) {
    this.navigation = router.getCurrentNavigation();
  }

  ngOnInit(): void {
    if (
      this.navigation &&
      this.navigation.extras.state &&
      this.navigation.extras.state['workshopData']
    ) {
      this.workshop = this.navigation.extras.state['workshopData'];
      this.collaboratorTableItems = this.workshop!.collaborators.map(collaborator => {
        return {
          id: collaborator.collaboratorId,
          name: collaborator.collaboratorName,
          workshopAttendanceId: collaborator.workshopAttendanceId
        }

      });

      this.updateTable();
    } else {
      console.warn('No workshop data found!');
    }
  }

  private updateTable(): void {
    this.tableData = {
      data: of(this.collaboratorTableItems),
      action: {
        name: 'Remover',
        icon: 'delete',
        class: 'danger',
        action: this.removeCollaboratorFromWorkshopAttendance.bind(this)
      },
      columns: [
        {
          title: 'Id',
          name: 'id',
          columnType: ColumnType.Data
        },
        {
          title: 'Nome',
          name: 'name',
          columnType: ColumnType.Data
        },
        {
          title: 'ATA',
          name: 'workshopAttendanceId',
          columnType: ColumnType.Data
        },
        {
          title: 'Ação',
          name: 'action',
          columnType: ColumnType.Action
        }
      ]
    }
  }

  removeCollaboratorFromWorkshopAttendance(collaboratorAttendance: CollaboratorTableItem) {
    const collaboratorId = collaboratorAttendance.id;
    const workshopAttendenceId = collaboratorAttendance.workshopAttendanceId

    console.log(collaboratorId + " and " + workshopAttendenceId)

    this.workshopAttendanceService.removeCollaboratorByWorkshopAttendanceIdAndCollaboratorId(workshopAttendenceId, collaboratorId).subscribe(() => {
        console.log(this.collaboratorTableItems.length);

      this.collaboratorTableItems = this.collaboratorTableItems
        .filter(tableItem => tableItem.id !== collaboratorId || tableItem.workshopAttendanceId !== workshopAttendenceId);

        console.log(this.collaboratorTableItems.length);

        this.tableData.data = of(this.collaboratorTableItems);
    });
  }
}
