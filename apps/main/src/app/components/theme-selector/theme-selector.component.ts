import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {
  StorageWrapperService
} from "@frontend-story/shared/utils/storage";
import {CustomThemeFileNamesEnum} from "../../enums/custom-theme-file-names.enum";
import {flow, isNil} from "lodash";

@Component({
  selector: 'fs-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {
  public selectedThemeFileName: CustomThemeFileNamesEnum;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly storage: StorageWrapperService,
  ) {
    this.selectedThemeFileName = this.getThemeFileName();
    console.log(this.selectedThemeFileName);
  }

  public ngOnInit(): void {
    console.log('Theme Selector');
  }

  private getThemeFileName(): CustomThemeFileNamesEnum {
    return flow([
      () => this.storage.getStorageItem(''),
      (storageValue: string | null) => {
        if (!isNil(storageValue) && Object.values(CustomThemeFileNamesEnum).includes(storageValue as CustomThemeFileNamesEnum)) {
          return storageValue;
        } else {
          return matchMedia?.('(prefers-color-scheme: dark)').matches ? CustomThemeFileNamesEnum.DARK : CustomThemeFileNamesEnum.LIGHT;
        }
      }
    ])()
  }
}
