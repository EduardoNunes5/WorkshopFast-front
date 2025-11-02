import { Observable } from 'rxjs';
import { Column } from './column';
import { TableAction } from './action';

export interface TableData<T> {
  columns: Column[];
  data: Observable<T[]>;
  action: TableAction<T>;
}
