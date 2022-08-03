## [Component styles](https://angular.io/guide/component-styles)
### Special selectors
#### :host
Element, into which the template is rendered, is called the host element. The `:host`
pseudo-class selector may be used to create styles that target the host element itself.
```css
:host {
  font-style: italic;
}
```

#### :host-context
Sometimes it's useful to apply styles to elements within a component's template based on
some condition in an element that is an ancestor of the host element.

Use the `:host-context()` pseudo-class selector, which works just like the function form
of `:host()`. The `:host-context()` selector looks for a CSS class in any ancestor of the
component host element, up to the document root.

The following example italicizes all text inside a component, but only if some ancestor
element of the host element has the CSS class `active`.
```css
:host-context(.active) {
  font-style: italic;
}
```
> Only the host element and its descendants will be affected, not the ancestor with the assigned active class.

#### (deprecated) /deep/, >>>, and ::ng-deep
Applying the ::ng-deep pseudo-class to any CSS rule completely disables view-encapsulation
for that rule. Any style with ::ng-deep applied becomes a global style.

### Loading component styles
#### Styles in component metadata
```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styles: ['h1 { font-weight: normal; }']
})
```

#### Style files in component metadata
```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styleUrls: ['./hero-app.component.css']
})
```

#### Template inline styles
```typescript
@Component({
  selector: 'app-hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button type="button" (click)="activate()">Activate</button>
  `
})
```

#### Template link tags
```typescript
@Component({
  selector: 'app-hero-team',
  template: `
    <!-- We must use a relative URL so that the AOT compiler can find the stylesheet -->
    <link rel="stylesheet" href="../assets/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team">
        {{member}}
      </li>
    </ul>`
})
```

#### CSS @imports
Import CSS files into the CSS files using the standard CSS @import rule.
```typescript
/* The AOT compiler needs the `./` to show that this is local */
@import './hero-details-box.css';
```

#### [External and global style files](https://angular.io/guide/workspace-config#styles-and-scripts-configuration)
When building with the CLI, you must configure the `angular.json` to include all
external assets, including external style files.

Register global style files in the `styles` section which, by default, is pre-configured
with the global `styles.css` file.

#### Non-CSS style files
If you're building with the CLI, you can write style files in `sass`, or `less`, and specify
those files in the `@Component.styleUrls` metadata with the appropriate extensions (`.scss`, `.less`)
```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
```
