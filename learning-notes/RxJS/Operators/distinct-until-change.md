## distinctUntilChanged

> Returns a result Observable that emits all values pushed by the source observable if they are
> distinct in comparison to the last value the result observable emitted.

### Description

When provided without parameters or with the first parameter (comparator), it behaves like this:

- It will always emit the first value from the source.
- For all subsequent values pushed by the source, they will be compared to the previously emitted
  values using the provided comparator or an `===` equality check.
- If the value pushed by the source is determined to be unequal by this check, that value is
  emitted and becomes the new "previously emitted value" internally.

When the second parameter (keySelector) is provided, the behavior changes:

- It will always emit the first value from the source.
- The `keySelector` will be run against all values, including the first value.
- For all values after the first, the selected key will be compared against the key selected from
  the previously emitted value using the comparator.
- If the keys are determined to be unequal by this check, the value (not the key), is emitted and
  the selected key from that value is saved for future comparisons against other keys.

### Examples

A very basic example with no comparator. Note that `1` is emitted more than once, because
it's distinct in comparison to the previously emitted value, not in comparison to all
other emitted values.

```typescript
import { of, distinctUntilChanged } from 'rxjs';

of(1, 1, 1, 2, 2, 2, 1, 1, 3, 3).pipe(distinctUntilChanged()).subscribe(console.log);
// Logs: 1, 2, 1, 3
```

With a comparator, you can do custom comparisons. Let's say you only want to emit a value
when all of its components have changed:

```typescript
import { of, distinctUntilChanged } from 'rxjs';

const totallyDifferentBuilds$ = of(
  { engineVersion: '1.1.0', transmissionVersion: '1.2.0' },
  { engineVersion: '1.1.0', transmissionVersion: '1.4.0' },
  { engineVersion: '1.3.0', transmissionVersion: '1.4.0' },
  { engineVersion: '1.3.0', transmissionVersion: '1.5.0' },
  { engineVersion: '2.0.0', transmissionVersion: '1.5.0' },
).pipe(
  distinctUntilChanged((prev, curr) => {
    return prev.engineVersion === curr.engineVersion
        || prev.transmissionVersion === curr.transmissionVersion;
  }),
);

totallyDifferentBuilds$.subscribe(console.log);

// Logs:
// { engineVersion: '1.1.0', transmissionVersion: '1.2.0' }
// { engineVersion: '1.3.0', transmissionVersion: '1.4.0' }
// { engineVersion: '2.0.0', transmissionVersion: '1.5.0' }
```
