import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'fs-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    // @Inject(LocalStorage) private storage: Storage,
  ) { }

  public ngOnInit(): void {
    console.log('Theme Selector')
  }

}
