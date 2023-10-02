import {Inject, Injectable} from '@angular/core';
import {isNil} from 'lodash';
import {LocalStorage, SessionStorage} from "./storage-provider.service";

@Injectable({
  providedIn: 'root'
})
export class StorageWrapperService {

  constructor(
    @Inject(LocalStorage) private readonly localStorage: Storage | null,
    @Inject(SessionStorage) private readonly sessionStorage: Storage | null,
  ) { }

  public setStorageItem(key: string, value: string, useSessionStorage = false): boolean {
    if (isNil(key)) {
      return false;
    }

    if (!useSessionStorage && isNil(this.localStorage)) {
      return false;
    }

    if (useSessionStorage && isNil(this.sessionStorage)) {
      return false;
    }

    if (useSessionStorage) {
      this.sessionStorage?.setItem(key, value)
    } else {
      this.localStorage?.setItem(key, value)
    }

    return true;
  }

  public getStorageItem(key: string): string | null {
    let result: string | null = null;

    if (!isNil(this.sessionStorage)) {
      result = this.sessionStorage.getItem(key);
    }

    if (!isNil(this.localStorage)) {
      result = result ?? this.localStorage.getItem(key);
    }

    return result;
  }
}
