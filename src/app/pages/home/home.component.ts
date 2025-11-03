import { Component, OnInit } from '@angular/core';
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
import { InputComponent } from '../../components/input/input.component';
import { MatInputModule } from '@angular/material/input';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WorkshopFilter } from '../../models/workshop/workshop-filter';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TableComponent,
    InputComponent,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  protected workshopTableItems: WorkshopTableItem[] = [];
  protected tableData = {} as TableData<WorkshopTableItem>;
  private workshops: Workshop[] = [];

  private activeFilter: { key: keyof WorkshopFilter | null; value: string } = {
    key: null,
    value: ''
  }

  constructor(
    private workshopAttendanceService: WorkshopAttendanceService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.resetTable();
  }

  private updateTableData(): void {
    this.tableData = {
      action: {
        name: 'visualizar',
        icon: 'visibility',
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
  }

  goToWorkshopDetails(event: WorkshopTableItem) {
    const foundWorkshop = this.workshops.find(
      (workshop) => workshop.id == event.id
    );

    this.router.navigate(['/workshops', foundWorkshop?.id, 'atas'], {
      state: {
        workshopData: foundWorkshop,
      },
    });
  }

  updateFilter(key: keyof WorkshopFilter, value: string): void {
    const searchValue = (value || '').trim();

    this.activeFilter = {
      key: searchValue.length > 0 ? key : null,
      value: searchValue
    }

    this.performSearch();
  }

  private performSearch() {
    if(this.activeFilter.key == null) {
      this.resetTable();
      return;
    }

    const { key: queryParameterKey, value } = this.activeFilter;

    let finalValue = value;
    if(queryParameterKey === 'data') {
      finalValue = this.datePipe.transform(value, 'dd/MM/yyyy HH:mm:00') || '';
    }

    let options = new HttpParams();
    options = options.set(queryParameterKey, finalValue);
    this.search(options);
  }

  private search(params: HttpParams): void {
    this.workshopAttendanceService
      .findWorkshopsWithFilters({ params })
      .subscribe((response) => {
        this.workshops = response;
        this.workshopTableItems = response.map((workshop) => {
          return {
            id: workshop.id,
            name: workshop.name,
            realizationDate: workshop.realizationDate,
            totalCollaborators: this.countCollaboratorsInWorkshop(workshop),
          };
        });

        this.updateTableData();
      });
  }

  private resetTable(): void {
        this.workshopAttendanceService.findAllV2().subscribe((response) => {
      this.workshops = response;
      this.workshopTableItems = response.map((workshop) => {
        return {
          id: workshop.id,
          name: workshop.name,
          realizationDate: workshop.realizationDate,
          totalCollaborators: this.countCollaboratorsInWorkshop(workshop),
        };
      });

      this.updateTableData();
    });
  }

  private countCollaboratorsInWorkshop(workshop: Workshop): number {
    const collaborators = workshop.collaborators;
    if(collaborators == null) {
      return 0;
    }
    return new Set(collaborators.map(collaborator => collaborator.collaboratorId)).size;
  }
}
