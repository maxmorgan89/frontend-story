## Let Directive

The `*ngrxLet` directive serves a convenient way of binding observables to a view context
(DOM element's scope). It also helps with several internal processing under the hood.

### Usage

The `*ngrxLet` directive is provided through the `LetModule`. To use it, add the `LetModule`
to the imports of your standalone `component` or `NgModule`:

```typescript
// Import in stanalone Component
@Component({
  // ... other metadata
  standalone: true,
  imports: [
    // ... other imports
    LetModule,
  ],
})

// Import in Module
@NgModule({
    imports: [
        // ... other imports
        ReactiveComponentModule,
    ],
})
// ReactiveComponentModule is deprecated in favor of LetModule.
```

### Comparison with *ngIf and async

The current way of binding an observable to the view looks like this:

```angular2html
<ng-container *ngIf="number$ | async as n">
    <app-number [number]="n"></app-number>

    <app-number-special [number]="n"></app-number-special>
</ng-container>
```

The problem is that `*ngIf` is interfering with rendering. In case of 0 (falsy value),
the component would be hidden.

The `*ngrxLet` directive takes over several things and makes it more convenient and safe to
work with streams in the template:

```angular2html
<ng-container *ngrxLet="number$ as n">
  <app-number [number]="n"></app-number>
</ng-container>

<ng-container *ngrxLet="number$; let n">
  <app-number [number]="n"></app-number>
</ng-container>
```

### Using Suspense Template

There is an option to pass the suspense template that will be displayed when an observable
is in a suspense state:

```angular2html
<ng-container *ngrxLet="number$ as n; suspenseTpl: loading">
  <app-number [number]="n"></app-number>
</ng-container>

<ng-template #loading>
  <p>Loading...</p>
</ng-template>
```

### Using Aliases for Non-Observable Values

The `*ngrxLet` directive can also accept static (non-observable) values as input argument.
This feature provides the ability to create readable templates by using aliases for deeply
nested properties:

```angular2html
<ng-container *ngrxLet="userForm.controls.email as email">
  <input type="text" [formControl]="email" />

  <ng-container *ngIf="email.errors && (email.touched || email.dirty)">
    <p *ngIf="email.errors.required">This field is required.</p>
    <p *ngIf="email.errors.email">This field must be an email.</p>
  </ng-container>
</ng-container>
```

### Included Features

- Binding is present even for falsy values. (See "Comparison with *ngIf and async" section)
- Takes away the multiple usages of the async or ngrxPush pipe.
- Allows displaying different content based on the current state of an observable.
- Provides a unified/structured way of handling null and undefined.
- Provides the ability to create readable templates by using aliases for nested properties.
- Triggers change detection using the RenderScheduler that behaves differently in zone-full and 
  zone-less mode.
- Distinct the same values in a row for better performance.
