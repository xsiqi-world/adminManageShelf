
export function setSession(key: string, val: string) {
  return sessionStorage.setItem(key, val);
}

export function getSession(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function sessionClear(): void {
  return sessionStorage.clear();
}