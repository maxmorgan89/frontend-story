## [Event binding](https://angular.io/guide/event-binding)

Event binding lets you listen for and respond to user actions such as keystrokes,
mouse movements, clicks, and touches.

### Binding to events

To bind to an event you use the Angular event binding syntax. This syntax consists of a target
event name within parentheses to the left of an equal sign, and a quoted template statement
to the right.

```angular2html
<button (click)="onSave()">Save</button>
```

The event binding listens for the button's click events and calls the component's `onSave()`
method whenever a click occurs.

### Binding to passive events

This is an advanced technique that is not necessary for most applications. You may find this
useful if you want to optimize frequently occurring events that are causing performance problems.

Angular also supports passive event listeners. For example, use the following steps to make
a scroll event passive.

1. Create a file `zone-flags.ts` under `src` directory.
2. Add the following line into this file.

```typescript
(window as any)['__zone_symbol__PASSIVE_EVENTS'] = ['scroll'];
```

3. In the `src/polyfills.ts` file, before importing `zone.js`, import the newly created zone-flags.

```typescript
content_copy;
import './zone-flags';
import 'zone.js'; // Included with Angular CLI.
```

After those steps, if you add event listeners for the scroll event, the listeners will be passive.

> Touch and wheel event listeners are useful for tracking user interactions and creating custom
> scrolling experiences, but they can also delay page scrolling. Currently, browsers can't know
> if an event listener will prevent scrolling, so they always wait for the listener to finish
> executing before scrolling the page. Passive event listeners solve this problem by letting
> you indicate that an event listener will never prevent scrolling.
