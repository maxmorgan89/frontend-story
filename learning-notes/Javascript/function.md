## Functions

A function is a block of code that performs a specific task.

In JavaScript, functions are first-class objects, because they can have properties and
methods just like any other object. What distinguishes them from other objects is that
functions can be called. In brief, they are `Function` objects.

### Function Declaration/Statement vs Expression (anonymous)

```typescript
function bar(a, b) {
  return a * b;
} // Function Declaration
var exp = function (a, b) {
  return a * b;
}; // Function Expression
```

The main difference between a function expression and a function declaration is the function name,
which can be omitted in function expressions to create anonymous functions.

- Function declarations load before any code is executed while Function expressions
  load only when the interpreter reaches that line of code.
- Similar to the var statement, function declarations are hoisted to the top of other code.
  Function expressions aren’t hoisted, which allows them to retain a copy of the
  local variables from the scope where they were defined.

### Decorators

Decorator is a special function that takes another function and alters its behavior.

Let’s say we have a `function slow(x)` which is CPU-heavy, but its results are stable.
In other words, for the same `x` it always returns the same result.

If the function is called often, we may want to cache (remember) the results to
avoid spending extra-time on recalculations.

But instead of adding that functionality into `slow()` we’ll create a wrapper function,
that adds caching. As we’ll see, there are many benefits of doing so.

```typescript
function slow(x) {
  // there can be a heavy CPU-intensive job here
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x); // otherwise call func

    cache.set(x, result); // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);

alert(slow(1)); // slow(1) is cached and the result returned
alert('Again: ' + slow(1)); // slow(1) result returned from cache

alert(slow(2)); // slow(2) is cached and the result returned
alert('Again: ' + slow(2)); // slow(2) result returned from cache
```

To summarize, there are several benefits of using a separate cachingDecorator instead
of altering the code of slow itself:

- The `cachingDecorator` is reusable. We can apply it to another function.
- The caching logic is separate, it did not increase the complexity of `slow` itself (if there was any).
- We can combine multiple decorators if needed (other decorators will follow).

### func.call(context, ...args)

There’s a special built-in function method `func.call(context, …args)` that allows to
call a function explicitly setting `this`.

### func.call(this, ...arguments)

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments,
while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```typescript
func.call(context, ...args);
func.apply(context, args);
```

There’s only a subtle difference regarding args:

- The spread syntax `...` allows to pass iterable `args` as the list to `call`.
- The `apply` accepts only array-like `args`.

### func.bind(context)

The result of `func.bind(context)` is a special function-like “exotic object”,
that is callable as function and transparently passes the call to `func` setting `this=context`.

In other words, calling boundFunc is like func with fixed this.

### Partial functions

We can bind not only `this`, but also `arguments`. That’s rarely done, but sometimes can be handy.

The full syntax of `bind`:

```typescript
let bound = func.bind(context, [arg1], [arg2], ...);
```

For instance, we have a multiplication function `mul(a, b)`.
Let’s use `bind` to create a function `double` on its base:

```typescript
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert(double(3)); // = mul(2, 3) = 6
alert(double(4)); // = mul(2, 4) = 8
alert(double(5)); // = mul(2, 5) = 10
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`,
fixing `null` as the context and `2` as the first argument. Further arguments are passed “as is”.

That’s called **partial function application** – we create a new function by fixing some
parameters of the existing one.

Please note that we actually don’t use `this` here. But `bind` requires it,
so we must put in something like `null`.

The benefit is that we can create an independent function with a readable name (`double`, `triple`).
We can use it and not provide the first argument every time as it’s fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

###### Going partial without context

What if we’d like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can’t just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

```typescript
function partial(func, ...argsBound) {
  return function (...args) {
    // (*)
    return func.call(this, ...argsBound, ...args);
  };
}

// Usage:
let user = {
  firstName: 'John',
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  },
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow('Hello');
// Something like:
// [10:00] John: Hello!
```

### Function object, NFE

In JavaScript, functions are objects.

A good way to imagine functions is as callable “action objects”. We can not only call them,
but also treat them as objects: add/remove properties, pass by reference etc.

Function has some properties:

- `name` - function's name `myFunc.name`
- `length` - returns the number of function parameters

###### Custom properties

We can also add properties to function of our own.

> A property assigned to a function like `sayHi.counter = 0` does not define a local variable`counter`
> inside it. In other words, a property `counter` and a variable `let counter`are two unrelated things.
> We can treat a function as an object, store properties in it, but that has no effect on its execution.
> Variables are not function properties and vice versa. These are just parallel worlds.
