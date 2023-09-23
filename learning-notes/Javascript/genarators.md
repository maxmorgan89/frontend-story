### \*\*\* [Generators](https://javascript.info/generators)

Regular functions return only one, single value (or nothing).

Generators can return (“yield”) multiple values, one after another, on-demand.
They work great with iterables, allowing to create data streams with ease.

When such function is called, it does not run its code.
Instead, it returns a special object, called “**generator object**”, to manage the execution.

The main method of a generator is `next()`. When called, it runs the execution until the nearest
`yield <value>` statement (`value` can be omitted, then it’s `undefined`).
Then the function execution pauses, and the yielded `value` is returned to the outer code.

The result of `next()` is always an object with two properties:

- `value`: the yielded value.
- `done`: `true` if the function code has finished, otherwise `false`.

#### Generators are iterable.

We can loop over their values using `for..of`

```typescript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
  // If last call will be with 'return', it will be ignored by iterator, because `done: true`
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

#### Using generators for iterables

```typescript
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // a shorthand for [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

alert([...range]); // 1,2,3,4,5
```

That works, because `range[Symbol.iterator]()` now returns a generator, and generator methods
are exactly what `for..of` expects:

- it has a `.next()` method
- that returns values in the form `{value: ..., done: true/false}`

#### “yield” is a two-way street

`yeild` not only returns the result to the outside, but also can pass the value inside the generator.
To do so, we should call `generator.next(arg)`, with an argument. That argument becomes the result of `yield`.

```typescript
function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield '2 + 2 = ?'; // (*)

  alert(result);
}

let generator = gen();

// The first call generator.next() should be always made without an argument (the argument is ignored if passed).
let question = generator.next().value; // <-- yield returns the value

generator.next(4); // --> pass the result into the generator
```

Outer code does not have to immediately call next(4). It may take time.
That’s not a problem: the generator will wait. unlike regular functions,
a generator and the calling code can exchange results by passing values in `next/yield`.

#### generator.throw

To pass an error into a `yield`, we should call `generator.throw(err)`.
In that case, the `err` is thrown in the line with that `yield`.

#### generator.return

`generator.return(value)` finishes the generator execution and return the given `value`.

### \*\*\* [Async generators](https://javascript.info/async-iterators-generators)

The syntax is simple: prepend function\* with async. That makes the generator asynchronous.
And then use `for await (...)` to iterate over it, like this:

```typescript
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // Wow, can use await!
    await new Promise((resolve) => setTimeout(resolve, 1000));

    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }
})();
```

As the generator is asynchronous, we can use await inside it, rely on promises, perform network
requests and so on.

For `async` generators, the `generator.next()` method is asynchronous, it returns `promises`.
In a regular generator we’d use `result = generator.next()` to get values.
In an async generator, we should add `await`, like this:

```typescript
result = await generator.next(); // result = {value: ..., done: true/false}
```

That’s why async generators work with `for await...of`.

|                          | Generators                    | Async generators                                         |
| ------------------------ | ----------------------------- | -------------------------------------------------------- |
| Declaration              | `function*`                   | `async function*`                                        |
| `next()` return value is | `{value:…, done: true/false}` | `Promise` that resolves to `{value:…, done: true/false}` |
| to loop, use             | `for..of`                     | `for await..of`                                          |

#### Async iterable range

```typescript
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    for (let value = this.from; value <= this.to; value++) {
      // make a pause between values, wait for something
      await new Promise((resolve) => setTimeout(resolve, 1000));

      yield value;
    }
  },
};

(async () => {
  for await (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }
})();
```

> Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the `object`,
> so it’s both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.
> In practice though, that would be a weird thing to do.
