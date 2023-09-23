## [Dynamic components](https://angular.io/guide/dynamic-component-loader)

Component templates are not always fixed. An application might need to load new components at runtime.
This cookbook shows you how to add components dynamically.

### The anchor directive

Before adding components, you have to define an anchor point to tell Angular where to insert components.

The ad banner uses a helper directive called AdDirective to mark valid insertion points in the template.

```typescript
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
```

`AdDirective` injects `ViewContainerRef` to gain access to the view container of the element that
will host the dynamically added component.

In the `@Directive` decorator, notice the selector name, `adHost`; that's what you use to apply the
directive to the element. The next section shows you how.

### Loading components

The `<ng-template>` element is where you apply the directive you just made. To apply the
`AdDirective`, recall the selector from `ad.directive.ts`, `[adHost]`. Apply that to
`<ng-template>` without the square brackets. Now Angular knows where to dynamically load components.

```typescript
template: `
  <div class="ad-banner-example">
    <h3>Advertisements</h3>
    <ng-template adHost></ng-template>
  </div>
`;
```

The `<ng-template>` element is a good choice for dynamic components because it doesn't render
any additional output.

### Resolving components

```typescript
export class AdBannerComponent implements OnInit {
  @Input() ads: AdItem[] = [];

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  ngOnInit(): void {
    this.loadComponent();
  }
  loadComponent() {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(this.ads[0].component);
    componentRef.instance.data = adItem.data;
  }
}
```
