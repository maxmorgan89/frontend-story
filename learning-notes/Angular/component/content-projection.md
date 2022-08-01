## Content projection

### Single-slot content projection
With this type of content projection, a component accepts content from a single source.

```typescript
@Component({
  selector: 'app-zippy-basic',
  template: `
    <h2>Single-slot content projection</h2>
    <ng-content></ng-content>
  `
})
export class ZippyBasicComponent {}

// In parent component template:
`<app-zippy-basic>
    <p>Is content projection cool?</p>
</app-zippy-basic>`
```
> The `<ng-content>` element is a placeholder that does not create a real DOM element.
Custom attributes applied to `<ng-content>` are ignored.

### Multi-slot content projection
A component can have multiple slots. Each slot can specify a CSS selector that
determines which content goes into that slot, by using the `select` attribute of `<ng-content>`.
Angular supports selectors for any combination of tag name, attribute, CSS class,
and the :not pseudo-class.

```typescript
@Component({
  selector: 'app-zippy-multislot',
  template: `
    <h2>Multi-slot content projection</h2>

    Default:
    <ng-content></ng-content>

    Question:
    <ng-content select="[question]"></ng-content>
  `
})
export class ZippyMultislotComponent {}

// In parent component template:
`<app-zippy-multislot>
    // Content that uses the question attribute is projected into the <ng-content> element
    // with the select=[question] attribute.
  <p question>
    Is content projection cool?
  </p>
  <p>Let's learn about content projection!</p>
</app-zippy-multislot>`
```

### [Conditional content projection](https://angular.io/guide/content-projection#conditional-content-projection)
Components that use conditional content projection render content only when specific conditions are met.

If your component needs to conditionally render content, or render content multiple times,
you should configure that component to accept an <ng-template> element that contains the
content you want to conditionally render.

Using an `<ng-content>` element in these cases is not recommended, because when the consumer
of a component supplies the content, that content is always initialized, even if the component
does not define an `<ng-content>` element or if that `<ng-content>` element is 
inside of an `ngIf` statement.

With an `<ng-template>` element, you can have your component explicitly render content based
on any condition you want, as many times as you want. Angular will not initialize the content
of an `<ng-template>` element until that element is explicitly rendered.

### Projecting content in more complex environments














