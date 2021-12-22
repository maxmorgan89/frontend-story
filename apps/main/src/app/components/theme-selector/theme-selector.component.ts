import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {
  StorageWrapperService
} from "@frontend-story/shared/utils/storage";

@Component({
  selector: 'fs-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly storage: StorageWrapperService,
  ) { }

  public ngOnInit(): void {
    console.log('Theme Selector');
    this.storage.setStorageItem('morgan', { name: 'Max', description: 'Is cool' });
    const a = this.storage.getStorageItem('morgan', true);
    console.log(a);
  }
}
