## [Property binding](https://angular.io/guide/property-binding)

Property binding in Angular helps you set values for properties of HTML elements or directives.
Use property binding to do things such as toggle button functionality, set paths programmatically,
and share values between components.

Property binding moves a value in one direction, from a component's property into a target
element property.

To read a target element property or call one of its methods, see the API reference for
`ViewChild` and `ContentChild`.

### Binding to a property

To bind to an element's property, enclose it in square brackets, `[]`, which identifies the
property as a target property.

```angular2html
<img alt="item" [src]="itemImageUrl">
```

The brackets, `[]`, cause Angular to evaluate the right-hand side of the assignment as a
dynamic expression.

Without the brackets, Angular treats the right-hand side as a string literal and sets the
property to that static value.

```angular2html
<app-item-detail childItem="parentItem"></app-item-detail>
```

Omitting the brackets renders the string parentItem, not the value of parentItem.
