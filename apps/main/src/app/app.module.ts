import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import {SharedUtilsStorageModule} from "@frontend-story/shared/utils/storage";

@NgModule({
  declarations: [AppComponent, ThemeSelectorComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedUtilsStorageModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
