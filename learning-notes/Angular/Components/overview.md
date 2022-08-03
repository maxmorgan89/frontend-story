## [Component](https://angular.io/guide/component-overview)
Components are the main building block for Angular applications. Each component consists of:
- An HTML template that declares what renders on the page
- A TypeScript class that defines behavior
- A CSS selector that defines how the component is used in a template
- Optionally, CSS styles applied to the template

###  Creating a component
To create component with CLi run `ng generate component <component-name>`

###  Specifying a component's CSS selector
Every component requires a CSS selector. A selector instructs Angular to instantiate this
component wherever it finds the corresponding tag in template HTML.

```typescript
@Component({
  selector: 'app-component-overview',
})
```

### Defining a component's template
A template is a block of HTML that tells Angular how to render the component in your application.
Define a template for your component in one of two ways: by referencing an external file,
or directly within the component.

```typescript
// To define a template as an external file:
@Component({
  selector: 'app-component-overview',
  templateUrl: './component-overview.component.html',
})
// To define a template within the component:
@Component({
  selector: 'app-component-overview',
  template: `
    <h1>Hello World!</h1>
    <p>This template definition spans multiple lines.</p>
  `,
})
```

### Declaring a component's styles
Declare component styles used for its template in one of two ways:
By referencing an external file, or directly within the component.
```typescript
// Styles for a component in a separate file:
@Component({
  selector: 'app-component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.css']
})
// Styles within the component:
@Component({
  selector: 'app-component-overview',
  template: '<h1>Hello World!</h1>',
  styles: ['h1 { font-weight: normal; }']
})
```
