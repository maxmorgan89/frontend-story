## Object properties
#### Object.prototype.constructor
The constructor property returns a reference to the Object constructor function that created
the instance object. Note that the value of this property is a reference to
the function itself, not a string containing the function's name.

Any object (with the exception of objects created with `Object.create(null))` will have
a constructor property on its `[[Prototype]]`. Objects created without the explicit use of
a constructor function (such as object literals and array literals) will have a constructor
property that points to the Fundamental Object constructor type for that object.
```typescript
let o = {}
o.constructor === Object // true

o = new Object
o.constructor === Object // true

let a = []
a.constructor === Array // true

a = new Array
a.constructor === Array // true

let n = new Number(3)
n.constructor === Number // true
```

#### Object.prototype.__proto__
> Deprecated: This feature is no longer recommended. Though some browsers might still support it,
it may have already been removed from the relevant web standards, or may only be kept for compatibility purposes.

The `__proto__` property of `Object.prototype` is an accessor property (a getter function
and a setter function) that exposes the internal `[[Prototype]]` (either an object or null)
of the object through which it is accessed.

It is deprecated in favor of `Object.getPrototypeOf/Reflect.getPrototypeOf`
and `Object.setPrototypeOf/Reflect.setPrototypeOf`

## Object methods
#### Object.assign(target, source)
method copies all enumerable own properties from one or more source objects to a target object.
It returns the modified target object.
```typescript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```
Properties in the target object are overwritten by properties in the sources if they have the same key.
Later sources' properties overwrite earlier ones.

The `Object.assign()` method only copies enumerable and own properties from a source object to
a target object. It uses `[[Get]]` on the source and `[[Set]]` on the target, so it will
invoke getters and setters. Therefore, it assigns properties, versus copying or defining
new properties. This may make it unsuitable for merging new properties into a prototype
if the merge sources contain getters.

For copying property definitions (including their enumerability) into prototypes,
use `Object.getOwnPropertyDescriptor()` and `Object.defineProperty()` instead.

Both String and Symbol properties are copied.

#### Object.create(proto, propertiesObject)
Method creates a new object, using an existing object as the prototype of the newly created object.
```typescript
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);
me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"
```
Parameters:
- `proto` - the object which should be the prototype of the newly-created object.

- `propertiesObject` (Optional) - if specified and not undefined, an object whose enumerable
  own properties (that is, those properties defined upon itself and not enumerable properties
  along its prototype chain) specify property descriptors to be added to the newly-created object,
  with the corresponding property names.
  These properties correspond to the second argument of `Object.defineProperties()`.

#### Object.is(value1, value2)
Method determines whether two values are the same value.
Returns a Boolean indicating whether or not the two arguments are the same value.

This is not the same as being equal according to the `==` operator. The `==` operator applies
various coercions to both sides (if they are not the same Type) before testing for equality
(resulting in such behavior as `"" == false` being `true`), but `Object.is` doesn't coerce either value.

This is also not the same as being equal according to the `===` operator. The only difference
between `Object.is()` and `===` is in their treatment of signed zeroes and NaNs.
For example, the `===` operator (and the `==` operator) treats the number values `-0` and `+0` as equal.
Also, the `===` operator treats `Number.NaN` and `NaN` as not equal.

```typescript
// Case 1: Evaluation result is the same as using ===
Object.is(25, 25);                // true
Object.is('foo', 'foo');          // true
Object.is('foo', 'bar');          // false
Object.is(null, null);            // true
Object.is(undefined, undefined);  // true
Object.is(window, window);        // true
Object.is([], []);                // false
const foo = { a: 1 };
const bar = { a: 1 };
Object.is(foo, foo);              // true
Object.is(foo, bar);              // false

// Case 2: Signed zero
Object.is(0, -0);                 // false
Object.is(+0, -0);                // false
Object.is(-0, -0);                // true
Object.is(0n, -0n);               // true

// Case 3: NaN
Object.is(NaN, 0/0);              // true
Object.is(NaN, Number.NaN)        // true
```

#### Object.getPrototypeOf(obj)
Returns the prototype (i.e. the value of the internal `[[Prototype]]` property) of the specified object.
If there are no inherited properties, `null` is returned.
```typescript
const proto = {};
const obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

#### Object.setPrototypeOf(obj, prototype)
method sets the prototype (i.e., the internal `[[Prototype]]` property) of a specified
object to another object or `null`.
> **Warning**: Changing the [[Prototype]] of an object is, by the nature of how modern JavaScript engines
optimize property accesses, currently a very slow operation in every browser and JavaScript engine.

#### Object.isExtensible(obj)
Method determines if an object is extensible (whether it can have new properties added to it).

#### Object.preventExtensions(obj)
Method prevents new properties from ever being added to an object (i.e. prevents future extensions to the object).

#### Object.defineProperty(obj, propertyName | Symbol, descriptor)
Static method `Object.defineProperty()` defines a new property directly on an object, or modifies
an existing property on an object, and returns the object.
```typescript
let user = {};
// Also, property may be redefined.
Object.defineProperty(user, "name", {
  value: "John",
  writable: true,
  enumerable: true,
  configurable: true,
});
```

#### Object.defineProperties(obj, props)
The `Object.defineProperties()` method defines new or modifies existing properties
directly on an object, returning the object.
```typescript
const obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```

#### Object.getOwnPropertyDescriptor(obj, propertyName | Symbol)
Method returns an object describing the configuration of a specific property on a given object
(that is, one directly present on an object and not in the object's prototype chain).
The object returned is mutable but mutating it has no effect on the original property's configuration.

#### Object.getOwnPropertyDescriptors(obj)
Method returns object, that contains all own property descriptors of a given object.

#### Object.prototype.hasOwnProperty(propName)
Method returns a boolean indicating whether the object has the specified property
as its own property (as opposed to inheriting it).
```typescript
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
// expected output: true

console.log(object1.hasOwnProperty('toString'));
// expected output: false
```
> Note: `Object.hasOwn()` is recommended over `hasOwnProperty()`, in browsers where it is supported.

#### Object.hasOwn(instance, propName | Symbol)
The `Object.hasOwn()` static method returns `true` if the specified object has the indicated property
as its own property. If the property is inherited, or does not exist, the method returns `false`.
```typescript
let example = {};
Object.hasOwn(example, 'prop');   // false = 'prop' has not been defined

example.prop = 'exists';
Object.hasOwn(example, 'prop');   // true - 'prop' has been defined

example.prop = null;
Object.hasOwn(example, 'prop');   // true - own property exists with value of null

example.prop = undefined;
Object.hasOwn(example, 'prop');   // true - own property exists with value of undefined
```
> Note: `Object.hasOwn()` is intended as a replacement for `Object.hasOwnProperty()`.

#### Object.getOwnPropertyNames(obj)
Method returns an array of all properties (including non-enumerable properties except
for those which use Symbol) found directly in a given object.
Items on the prototype chain are not listed.

#### Object.getOwnPropertySymbols(obj)
Method returns an array of all symbol properties found directly upon a given object.
As all objects have no own symbol properties initially (only global Symbols), `Object.getOwnPropertySymbols()`
returns an empty array unless you have set symbol properties on your object.

#### 


#### 


#### 


#### 


#### 


#### 


#### 


