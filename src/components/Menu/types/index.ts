export interface menuItem {
  id: number | string;
  index?: string | null;
  name: string;
  children?: menuItem[];
  path?: string;
}
