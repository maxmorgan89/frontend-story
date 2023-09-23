## Actions

- Unified interface to describe events
- Just data, no functionality
- Has at a minimum a type property
- Strongly typed using classes and enums

**Good actions hygiene:**

- Unique events get unique actions
- Actions are grouped by their source
- Actions are never reused

**Good naming example:**

- `"[Movies Page] Select Movie”`
- `"[Movies Page] Add Movie"`
- `"[Movies Page] Update Movie"`
- `"[Movies Page] Delete Movie”`

Actions are one of the main building blocks in NgRx. Actions express unique events that happen
throughout your application. From user interaction with the page, external interaction through
network requests, and direct interaction with device APIs, these and more events are described
with actions.

### Writing actions

There are a few rules to writing good actions within your application.

- **Upfront** - write actions before developing features to understand and gain a shared
  knowledge of the feature being implemented.
- **Divide** - categorize actions based on the event source.
- **Many** - actions are inexpensive to write, so the more actions you write, the better you express
  flows in your application.
- **Event-Driven** - capture events not commands as you are separating the description of an event
  and the handling of that event.
- **Descriptive** - provide context that are targeted to a unique event with more detailed
  information you can use to aid in debugging with the developer tools.

```typescript
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

// On login page componsent:
onSubmit(username: string, password: string) {
    store.dispatch(login({ username: username, password: password }));
}
```
