import { ColumnType } from './../../models/table/column';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableData } from '../../models/table/data';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatIconModule, MatButton, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges {
  @Input({ required: true}) source!: TableData<any>;
  protected columns: string[] = [];

  ColumnType = ColumnType;

  public ngOnChanges(): void {
    if(this.source.columns == null) {
      return;
    }

    console.log('colunando' + JSON.stringify(this.source));

    this.columns = this.source.columns.map((column) => column.name)
  }
}
