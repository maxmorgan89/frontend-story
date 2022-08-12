## Overview

- State flows down, changes flow up
- Indirection between state and consumers - doesn't know where the state comes from, or who
  changes the state
- Select & Dispatch => @Input & @Output
- Single responsibility principle. Delegate responsibilities to individual modules of code

### When to use NgRx

- Pass data down the component tree, but it does not belong to components in the middle of
  this chain
- When data may be updated from server on push
- When the same data has to be used in different modules or components (independent siblings)

### What problems it solves

- Solve the problem of component interaction via the Observable pattern
- Provide a client-side cache if needed, to avoid doing repeated Ajax requests
- Provide a place to put temporary UI state, as we fill in a large form or want to store
  search criteria in a search form when navigating between router views
- Solve the problem of allowing modification of client side transient data by multiple actors

### Tradeoffs

- Store is an application wide singleton service
- We need to clean it up in all the right places, and that does not scale well in complexity

### Alternative solutions in Angular

- We can inject services deep in the component tree if we want to, have a look at Angular Smart
  Components vs Presentation Components
- We can even inject components or services into each other if we feel they are inherently
  tightly coupled
- We can create shared data services that might or might not store the data

### Debugging

Install Redux DevTools browser extension. It allows to see application state changes, actions etc.
