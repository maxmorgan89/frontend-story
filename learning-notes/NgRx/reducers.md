## Reducers

Reducers in NgRx are responsible for handling transitions from one state to the next state in
your application. Reducer functions handle these transitions by determining which actions
to handle based on the action's type.

Reducers are pure functions in that they produce the same output for a given input. They are
without side effects and handle each state transition synchronously. Each reducer function takes
the latest Action dispatched, the current state, and determines whether to return a newly
modified state or the original state.

- Produce new states
- Receive the last state and next action
- Listen to specific actions
- Use pure, immutable operations

```typescript
export const moviesReducer = createReducer(
  initialState,
  // We can add several actions to reducer, if they do the same thing
  on(MoviesPageActions.enter, MoviesPageActions.clearSelectedMovie, (state, action) => {
    return {
      // Just expand the previous state object
      ...state,
      // The actual state change
      activeMovieId: null,
    };
  }),
  on(MoviesPageActions.selectMovie, (state, action) => {
    return {
      ...state,
      activeMovieId: action.movieId,
    };
  }),
);
```
