export interface TableAction<T> {
  name: string;
  icon?: string;
  class?: 'danger' | 'warn';
  action: (item: T) => void;
}
