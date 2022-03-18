export interface menuItem<T = any> {
  id: number | string;
  name: string;
  children?: T[];
  path?: string;
}
