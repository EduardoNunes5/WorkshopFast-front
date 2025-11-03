import { ColumnType } from './../../models/table/column';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableData } from '../../models/table/data';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { TableItem } from '../../models/table/table-item';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatIconModule, MatButton, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T extends TableItem> implements OnChanges {
  @Input({ required: true}) source!: TableData<T>;
  protected columns: string[] = [];
  @Input()
  clickable = false;

  @Output() rowClick = new EventEmitter<T>();

  ColumnType = ColumnType;

  public ngOnChanges(): void {
    if(this.source.columns == null) {
      return;
    }

    this.columns = this.source.columns.map((column) => column.name)
  }

  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }
}
