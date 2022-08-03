## [Sharing data between child and parent directives and components](https://angular.io/guide/inputs-outputs)
A common pattern in Angular is sharing data between a parent component and one or more child
components. Implement this pattern with the `@Input()` and `@Output()` decorators.

### Sending data to a child component
The `@Input()` decorator in a child component or directive signifies that the property
can receive its value from its parent component.

```typescript
import { Component, Input } from '@angular/core'; // First, import Input
// Child component
@Component({
  template: `<p>
    Today's item: {{item}}
  </p>`
})
export class ItemDetailComponent {
  @Input() item = ''; // decorate the property with @Input()
}

// Parent component
@Component({
  template: `<app-item-detail [item]="currentItem"></app-item-detail>`
})
export class AppComponent {
  currentItem = 'Television';
}
```

#### Watching for @Input() changes
To watch for changes on an `@Input()` property, use `OnChanges`, one of Angular's lifecycle hooks.

### Sending data to a parent component
The `@Output()` decorator in a child component or directive lets data flow from
the child to the parent.

```typescript
import { Component, Output, EventEmitter } from '@angular/core';
// Child component
@Component({
  selector: 'app-item-output',
  template: `
      <label for="item-input">Add an item:</label>
      <input type="text" id="item-input" #newItem>
      <button type="button" (click)="addNewItem(newItem.value)">Add to parent's list</button>
    `
})
export class ItemOutputComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
}

// Parent component
@Component({
  selector: 'app-parent',
  template: `
    <ul>
      <li *ngFor="let item of items">{{item}}</li>
    </ul>
    <app-item-output (newItemEvent)="addItem($event)"></app-item-output>`
})
export class AppComponent {
  items = ['item1', 'item2', 'item3', 'item4'];

  addItem(newItem: string) {
    this.items.push(newItem);
  }
}
```
