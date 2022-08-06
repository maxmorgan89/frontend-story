## Object

Used to store various keyed collections and more complex entities.
Objects can be created using the Object() constructor or the object initializer (Object.create()) / literal syntax ({}).
An object initializer is a comma-delimited list of zero or more pairs of property
names and associated values of an object, enclosed in curly braces ({}).

#### Prototype

When we read a property from object, and it’s missing, JavaScript automatically takes it from the prototype.
The prototype is only used for reading properties. Write/delete operations work directly with the object.

No matter where the method is found: in an object or its prototype.
In a method call, `this` is always the object before the dot.

- `__proto__` is the actual object that is used in the lookup chain to resolve methods, etc.
- `prototype` is the object that is used to build `__proto__` when you create an object with `new`

```typescript
(new Foo().__proto__ === Foo.prototype(new Foo()).prototype) === undefined;
```

#### Property flags and descriptors

Object properties, besides a value, have three special attributes (so-called “flags”):

- `writable` – if `true`, the value can be changed, otherwise it’s read-only.
- `enumerable` – if `true`, then listed in loops, otherwise not listed.
- `configurable` – if `true`, the property can be deleted and these attributes can be modified,
  otherwise not. Value can be modified in any case.
  Making a property non-configurable is a **one-way road**. We cannot change it back with
  `Object.defineProperty`.

To change the flags, we can use `Object.defineProperty` or `Object.defineProperties`.

```typescript
let user = {};
// Also, property may be redefined.
Object.defineProperty(user, 'name', {
  value: 'John',
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2,
  // ...
});
```

The method `Object.getOwnPropertyDescriptor` allows to query the full information about a property.
To get all property descriptors at once, we can use the method
`Object.getOwnPropertyDescriptors(obj)`.
Returns all property descriptors, including symbolic and non-enumerable ones.
Together with `Object.defineProperties` it can be used as a “flags-aware” way of cloning an object:

```typescript
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

#### Sealing an object globally

Property descriptors work at the level of individual properties.
There are also methods that limit access to the whole object:

- `Object.preventExtensions(obj)` - forbids the addition of new properties to the object.
- `Object.seal(obj)` - forbids adding/removing of properties. Sets configurable: false for
  all existing properties.
- `Object.freeze(obj)` - forbids adding/removing/changing of properties.
  Sets configurable: false, writable: false for all existing properties.

And also there are tests for them:

- `Object.isExtensible(obj)` - returns false if adding properties is forbidden, otherwise true.
- `Object.isSealed(obj)` - returns true if adding/removing properties is forbidden,
  and all existing properties have configurable: false.
- `Object.isFrozen(obj)` - returns true if adding/removing/changing properties is forbidden,
  and all current properties are configurable: false, writable: false.
