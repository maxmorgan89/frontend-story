## [Template Reference Variables](https://angular.io/guide/template-reference-variables)

Template variables help you use data from one part of a template in another part of the template.
Use template variables to perform tasks such as respond to user input or finely tune your
application's forms.

A template variable can refer to the following:

- a DOM element within a template
- a directive or component
- a TemplateRef from an ng-template
- a web component

### Syntax

In the template, you use the hash symbol, `#`, to declare a template variable.

```angular2html
<input #phone placeholder="phone number" />

<!-- lots of other elements -->

<!-- phone refers to the input element; pass its `value` to an event handler -->
<button type="button" (click)="callPhone(phone.value)">Call</button>
```

### How Angular assigns values to template variables

Angular assigns a template variable a value based on where you declare the variable:

- If you declare the variable on a component, the variable refers to the component instance.
- If you declare the variable on a standard HTML tag, the variable refers to the element.
- If you declare the variable on an `<ng-template>` element, the variable refers to a
  `TemplateRef` instance which represents the template. For more information on `<ng-template>`,
  see How Angular uses the asterisk, `*`, syntax in Structural directives.

### Variable specifying a name

If the variable specifies a name on the right-hand side, such as `#var="ngModel"`, the variable
refers to the directive or component on the element with a matching `exportAs` name.

##### Using NgForm with template variables

In most cases, Angular sets the template variable's value to the element on which it occurs.
In the previous example, phone refers to the phone number `<input>`. The button's click handler
passes the `<input>` value to the component's `callPhone()` method.

The `NgForm` directive demonstrates getting a reference to a different value by referencing
a directive's `exportAs` name.

```angular2html
<form #itemForm="ngForm" (ngSubmit)="onSubmit(itemForm)">
  <label for="name">Name</label>
  <input type="text" id="name" class="form-control" name="name" ngModel required />
  <button type="submit">Submit</button>
</form>

<div [hidden]="!itemForm.form.valid">
  <p>{{ submitMessage }}</p>
</div>
```

Without the `ngForm` attribute value, the reference value of `itemForm` would be the
`HTMLFormElement`, `<form>`. If an element is an Angular Component, a reference with no attribute
value will automatically reference the component instance. Otherwise, a reference with no value
will reference the DOM element, even if the element has one or more directives applied to it.

### Template variable scope

Just like variables in JavaScript or TypeScript code, template variables are scoped to the
template that declares them.

Similarly, Structural directives such as `*ngIf` and `*ngFor`, or `<ng-template>` declarations
create a new nested template scope, much like JavaScript's control flow statements like if and for
create new lexical scopes. You cannot access template variables within one of these
structural directives from outside of its boundaries.

An inner template can access template variables that the outer template defines.

```angular2html
<input #ref1 type="text" [(ngModel)]="firstExample" />
<span *ngIf="true">Value: {{ ref1.value }}</span>
```

However, accessing a template variable from a child scope in the parent template doesn't work:

```angular2html
<input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />
<span>Value: {{ ref2?.value }}</span> <!-- doesn't work -->
```

### Template input variable

A template input variable is a variable with a value that is set when an instance of that
template is created, e.g. structural directives

Template input variables can be seen in action in the long-form usage of NgFor:

```angular2html
content_copy
<ul>
  <ng-template ngFor let-hero let-i="index" [ngForOf]="heroes">
      <li>No.: {{i}}; Name:{{hero.name}}</li>
  </ng-template>
</ul>
```
