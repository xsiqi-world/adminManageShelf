export interface menuItem<T = any> {
  id: number | string;
  index?: string | null
  name: string;
  children?: T[];
  path?: string;
}
