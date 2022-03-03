export interface menuItem {
  id: number | string,
  name: string,
  children?: menuItem[],
  path?: string
}