## @ngrx/component overview

> Note: `ngrxPush` pipe only works when we use the Store. Just in case you want to use it for
> whatever reason without using NGRX, it won’t work.

Component is a library for building reactive Angular templates. It provides a set of
declarables that can work with or without `zone.js`. They give more control over rendering
and provide further reactivity for Angular applications.

> This package is still experimental and may change during development.

### Key Concepts

- Rendering observable events in a performant way.
- Displaying different content based on the current state of an observable.
- Creating readable templates by using aliases for nested properties.
- Building fully reactive Angular applications regardless of whether `zone.js` is present or not.
