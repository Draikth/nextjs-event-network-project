export function getLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
}

export function setLocalStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
}
