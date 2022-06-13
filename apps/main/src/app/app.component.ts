import { Component } from '@angular/core';
import {Range} from "./helpers/range";

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'main';
  public arr: number[] = [...new Range(1, 5)]
}
