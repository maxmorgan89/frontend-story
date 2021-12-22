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

  public setStorageItem(key: string, value: unknown, useSessionStorage = false): boolean {
    if (isNil(key)) {
      return false;
    }

    if (!useSessionStorage && isNil(this.localStorage)) {
      return false;
    }

    if (useSessionStorage && isNil(this.sessionStorage)) {
      return false;
    }

    const preparedValue: string = typeof value === 'string' ? value : JSON.stringify(value);

    if (useSessionStorage) {
      this.sessionStorage?.setItem(key, preparedValue)
    } else {
      this.localStorage?.setItem(key, preparedValue)
    }

    return true;
  }

  public getStorageItem(key: string, parseJsonResult = false): string | null {
    let result: string | null = null;

    if (!isNil(this.sessionStorage)) {
      result = this.sessionStorage.getItem(key);
    }

    if (!isNil(this.localStorage)) {
      result = result ?? this.localStorage.getItem(key);
    }

    if (parseJsonResult && !isNil(result)) {
      result = JSON.parse(result);
    }

    return result;
  }
}
