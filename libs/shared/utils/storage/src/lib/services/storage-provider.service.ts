import { InjectionToken } from '@angular/core';


export const WindowToken = new InjectionToken<Window>('Window');
export function windowProvider() { return window; }

export const LocalStorage = new InjectionToken<Storage | null>('LocalStorage');
export const localStorageProvider = (win: Window) => getStorage(win, 'localStorage');

export const SessionStorage = new InjectionToken<Storage | null>('SessionStorage');
export const sessionStorageProvider = (win: Window) => getStorage(win, 'sessionStorage');

function getStorage(win: Window, storageType: 'localStorage' | 'sessionStorage'): Storage | null {
  // When cookies are disabled in the browser, even trying to access `window[storageType]` throws an error.
  try {
    return win[storageType];
  } catch {
    return null;
  }
}
