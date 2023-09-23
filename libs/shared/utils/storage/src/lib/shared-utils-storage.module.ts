import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LocalStorage,
  localStorageFactory,
  SessionStorage,
  sessionStorageFactory,
  windowFactory,
  WindowToken
} from "./services/storage-provider.service";

@NgModule({
  providers: [
    { provide: WindowToken, useFactory: windowFactory },
    { provide: LocalStorage, useFactory: localStorageFactory, deps: [WindowToken] },
    { provide: SessionStorage, useFactory: sessionStorageFactory, deps: [WindowToken] },
  ],
  imports: [CommonModule],
})
export class SharedUtilsStorageModule {}
