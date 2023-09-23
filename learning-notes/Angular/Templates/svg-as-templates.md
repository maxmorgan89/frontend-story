## [SVG as templates](https://angular.io/guide/svg-in-templates)

You can use SVG files as templates in your Angular applications. When you use an SVG as the
template, you are able to use directives and bindings just like with HTML templates.
Use these features to dynamically generate interactive graphics.

### SVG syntax example

```angular2html
<svg>
  <g>
    <rect x="0" y="0" width="100" height="100" [attr.fill]="fillColor" (click)="changeColor()" />
    <text x="120" y="50">click the rectangle to change the fill color</text>
  </g>
</svg>
```

The example given uses a `click()` event binding and the property binding syntax
(`[attr.fill]="fillColor"`).
