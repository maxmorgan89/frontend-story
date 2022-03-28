import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageWrapperService } from "./services";
import {
  LocalStorage,
  localStorageProvider,
  SessionStorage,
  sessionStorageProvider,
  windowProvider,
  WindowToken
} from "./services/storage-provider.service";

@NgModule({
  providers: [
    { provide: WindowToken, useFactory: windowProvider },
    { provide: LocalStorage, useFactory: localStorageProvider, deps: [WindowToken] },
    { provide: SessionStorage, useFactory: sessionStorageProvider, deps: [WindowToken] },
    StorageWrapperService,
  ],
  imports: [CommonModule],
})
export class SharedUtilsStorageModule {}
