### \*\*\* [Proxy](https://javascript.info/proxy)

A Proxy object wraps another object and intercepts operations, like reading/writing properties
and others, optionally handling them on its own, or transparently allowing the object to handle them.
It can wrap any kind of object, including classes and functions.

```typescript
let proxy = new Proxy(target, handler);
```

- `target` – is an object to wrap, can be anything, including functions.
- `handler` – proxy configuration: an object with “traps”, methods that intercept
  operations. – e.g. `get` trap for reading a property of target, `set` trap for writing a property into target, and so on.

Without any traps, proxy is a transparent wrapper around target:
![Proxy wrapper](images/proxy.png)
Proxy is a special “exotic object”. It doesn’t have own properties.
With an empty handler it transparently forwards operations to target.

For most operations on objects, there’s a so-called “internal method” in the JavaScript specification
that describes how it works at the lowest level. For instance `[[Get]]`, the internal method
to read a property, `[[Set]]`, the internal method to write a property, and so on.
These methods are only used in the specification, we can’t call them directly by name.

Proxy traps intercept invocations of these methods.

| Internal Method         | Handler Method             | Triggers when…                                                                                        |
| ----------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `[[Get]]`               | `get`                      | reading a property                                                                                    |
| `[[Set]]`               | `set`                      | writing to a property                                                                                 |
| `[[HasProperty]]`       | `has`                      | `in` operator                                                                                         |
| `[[Delete]]`            | `deleteProperty`           | `delete` operator                                                                                     |
| `[[Call]]`              | `apply`                    | function call                                                                                         |
| `[[Construct]]`         | `construct`                | `new` operator                                                                                        |
| `[[GetPrototypeOf]]`    | `getPrototypeOf`           | `Object.getPrototypeOf`                                                                               |
| `[[SetPrototypeOf]]`    | `setPrototypeOf`           | `Object.setPrototypeOf`                                                                               |
| `[[IsExtensible]]`      | `isExtensible`             | `Object.isExtensible`                                                                                 |
| `[[PreventExtensions]]` | `preventExtensions`        | `Object.preventExtensions`                                                                            |
| `[[DefineOwnProperty]]` | `defineProperty`           | `Object.defineProperty`, `Object.defineProperties`                                                    |
| `[[GetOwnProperty]]`    | `getOwnPropertyDescriptor` | `Object.getOwnPropertyDescriptor`, `for..in`, `Object.keys/values/entries`                            |
| `[[OwnPropertyKeys]]`   | `ownKeys`                  | `Object.getOwnPropertyNames`, `Object.getOwnPropertySymbols`, `for..in`, `Object.keys/values/entries` |

JavaScript enforces some invariants – conditions that must be fulfilled by internal methods and traps.
ost of them are for return values:

- `[[Set]]` must return true if the value was written successfully, otherwise false.
- `[[Delete]]` must return true if the value was deleted successfully, otherwise false.
- …and so on, we’ll see more in examples below.

#### Default value with “get” trap

To intercept reading, the handler should have a method `get(target, property, receiver)`.

- `target` – is the target object, the one passed as the first argument to new Proxy,
- `property` – property name,
- `receiver` – if the target property is a getter, then `receiver` is the object that’s going
  to be used as this in its call. Usually that’s the proxy object itself (or an object that inherits
  from it, if we inherit from proxy).

We’ll make a numeric array that returns 0 for nonexistent values.

```typescript
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  },
});

alert(numbers[1]); // 1
alert(numbers[123]); // 0 (no such item)
```

#### Proxy limitations

Many built-in objects, for example `Map`, `Set`, `Date`, `Promise` and others make use of so-called “_internal slots_”.

These are like properties, but reserved for internal, specification-only purposes.
For instance, `Map` stores items in the internal slot `[[MapData]]`. Built-in methods access
them directly, not via `[[Get]]`/`[[Set]]` internal methods. So Proxy can’t intercept that.

Internally, a `Map` stores all data in its `[[MapData]]` internal slot. The proxy doesn’t have such
a slot. The built-in method `Map.prototype.set` method tries to access the internal property
`this.[[MapData]]`, but because `this=proxy`, can’t find it in proxy and just fails.

Fortunately, there’s a way to fix it:

```typescript
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  },
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
```

Now it works fine, because `get` trap binds function properties, such as `map.set`,
to the target object (`map`) itself.

#### Revocable proxies

A revocable proxy is a proxy that can be disabled.

Let’s say we have a resource, and would like to close access to it any moment.
What we can do is to wrap it into a revocable proxy, without any traps. Such a proxy will
forward operations to object, and we can disable it at any moment.

```typescript
let object = {
  data: 'Valuable data',
};

let { proxy, revoke } = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
alert(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
alert(proxy.data); // Error
```

A call to `revoke()` removes all internal references to the target object from the proxy,
so they are no longer connected.

Initially, `revoke` is separate from `proxy`, so that we can pass proxy around while leaving revoke in the current scope.

### Reflect

`Reflect` is a built-in object that simplifies creation of `Proxy`.

It was said previously that internal methods, such as `[[Get]]`, `[[Set]]` and others are
specification-only, they can’t be called directly.
The `Reflect` object makes that somewhat possible. Its methods are minimal wrappers around the internal methods.

In particular, Reflect allows us to call operators (`new`, `delete`…) as functions
(`Reflect.construct`,`Reflect.deleteProperty`, …).

**For every internal method, trappable by `Proxy`, there’s a corresponding method in `Reflect`,
with the same name and arguments as the Proxy trap.** So we can use Reflect to forward an
operation to the original object.
