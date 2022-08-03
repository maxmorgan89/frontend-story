## [Two-way binding](https://angular.io/guide/two-way-binding)

Two-way binding gives components in your application a way to share data. Use two-way binding
to listen for events and update values simultaneously between parent and child components.

### Adding two-way data binding

Angular's two-way binding syntax is a combination of square brackets and parentheses,
`[()]`. The `[()]` syntax combines the brackets of property binding, `[]`, with the parentheses
of event binding, `()`, as follows.

```angular2html
<app-sizer [(size)]="fontSizePx"></app-sizer>
```
