export interface TableAction<T> {
  name: string;
  icon?: string;
  action: (item: T) => void;
}
