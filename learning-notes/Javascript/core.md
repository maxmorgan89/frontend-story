# JS Core

### * Primitive values
JavaScript has 7 primitive data types:

1. null
2. undefined
3. boolean
4. number
5. string
6. symbol – available only from ES2015
7. BigInt – available from ES2020

And one complex Data Type - object.

### * Are primitive values/objects mutable or immutable?
All primitives are immutable, i.e., they cannot be altered. It is important not to
confuse a primitive itself with a variable assigned a primitive value.
The variable may be reassigned a new value, but the existing value can not be changed
in the ways that objects, arrays, and functions can be altered.

### * How does coercion work? Describe how it compares the following: 3 > 2 > 1
Type **Coercion** refers to the process of automatic or implicit conversion of values
from one data type to another. This includes conversion from Number to String,
String to Number, Boolean to Number etc. when different types of operators are
applied to the values. Constructors of a data type can be used to convert any
value to that datatype, like the Number(), String() or Boolean() constructor.

`3 > 2 > 1`

`3 > 2` - true

`true > 1` - false, because `Number(true)` - 1, and `1 > 1` - false

### * Can we delete (using delete operator) any property declared with var/let/const from the global scope or from a function's scope?
No. The JavaScript delete operator removes a property from an object;
if no more references to the same property are held, it is eventually released automatically.

### * Precedence (operators priority)
Operator precedence determines how operators are parsed concerning each other.
Operators with higher precedence become the operands of operators with lower precedence.
```typescript
console.log(3 + 4 * 5); // 3 + 20
// expected output: 23
console.log(4 * 3 ** 2); // 4 * 9
// expected output: 36
let a;
let b;
console.log(a = b = 5);
// expected output: 5
```

### ** let
A variable is a “named storage” for data.

### ** const
Cannot be reassigned. An attempt to do so would cause an error.

### ** class
In object-oriented programming, a class is an extensible program-code-template for
creating objects, providing initial values for state (member variables) and implementations
of behavior (member functions or methods).

In JavaScript, a class is a kind of function.
```typescript
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// proof: User is a function
alert(typeof User); // function
```
What class User {...} construct really does is:
1. Creates a function named User, that becomes the result of the class declaration.
   The function code is taken from the constructor method (assumed empty if we don’t write such method).
2. Stores class methods, such as sayHi, in User.prototype.
After new User object is created, when we call its method, it’s taken from the prototype.

#### Class is not just a syntactic sugar
Sometimes people say that class is a “syntactic sugar”, because we could actually declare
the same thing without using the class keyword at all, like with `function`.
1. First, a function created by class is labelled by a special internal property `[[IsClassConstructor]]`: `true`.
So it’s not entirely the same as creating it manually. The language checks for that property in a variety of places.
For example, unlike a regular function, it must be called with `new`
2. Class methods are non-enumerable. A class definition sets enumerable flag to `false`
for all methods in the `prototype`.
That’s good, because if we `for..in` over an object, we usually don’t want its class methods.
3. Classes always use strict. All code inside the class construct is automatically in strict mode.
Besides, `class` syntax brings many other features that we’ll explore later.

### \** Arrow function (anonymous)
Arrow functions can be used in the same way as Function Expressions.
- Arrow functions do not have this. If this is accessed, it is taken from the outside.
- Not having this naturally means another limitation: arrow functions can’t be
used as constructors. They can’t be called with new.
- `.bind(this)` creates a “bound version” of the function. The arrow => does not create any binding.
- Arrow functions also have no arguments variable.
- They also don’t have `super`

### \** Spread operator
Spread syntax (...) allows an iterable such as an array expression or string to be expanded
in places where zero or more arguments (for function calls) or elements (for array literals)
are expected, or an object expression to be expanded in places where zero or more key-value
pairs (for object literals) are expected.

**Rest** syntax looks exactly like **spread** syntax. In a way, rest syntax is the opposite of
spread syntax. **Spread** syntax **expands** an array into its elements, while **rest** syntax
**collects** multiple elements and "condenses" them into a single element.
```typescript
myFunction(...iterableObj); // pass all elements of iterableObj as arguments to function myFunction
[...iterableObj, '4', 'five', 6]; // combine two arrays by inserting all elements from iterableObj
let objClone = { ...obj }; // pass all key:value pairs from an object
```

### \** [Rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
The rest parameter syntax allows a function to accept an indefinite number of arguments as an array,
providing a way to represent variadic functions (which accepts a variable number of arguments) in JavaScript.
Should be used instead of `arguments`. Array-like object (not all methods are available), that is accessible inside functions
that contains the values of the arguments passed to that function.
```typescript
function f(a, b, ...theArgs) {
  // ...
}
```
A function definition's last parameter can be prefixed with `...`, which will cause all
remaining (user supplied) parameters to be placed within a standard JavaScript array.
Only the last parameter in a function definition can be a rest parameter.

### \** [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
The destructuring assignment syntax is a JavaScript expression that makes it possible
to unpack values from arrays, or properties from objects, into distinct variables.
```typescript
// With default value and ignoring value
const [x = 3, , y, ...restArr] = [10, 20, 30, 40, 50];
console.log(x); // 10
console.log(y); // 30
console.log(rest); // [40, 50]

const { a, b } = { a: 10, b: 20 };
console.log(a); // 10
console.log(b); // 20

// Stage 4(finished) proposal
const {c, d, ...restObj} = {a: 10, b: 20, c: 30, d: 40};
console.log(c); // 10
console.log(d); // 20
console.log(rest); // {c: 30, d: 40}
```

### ** Template literals (String templates)
Template literals are literals delimited with backtick (`) characters,
allowing for multi-line strings, for string interpolation with embedded expressions,
and for special constructs called tagged templates.
```typescript
// Untagged, these create strings:
`string text`
`string text ${expression} string text`

// Tagged, this calls the function "tagFunction" with the template as the
// first argument and substitution values as subsequent arguments:
function tagFunction(strings, personExp, ageExp) {
  let str0 = strings[0]; // "That "
  let str1 = strings[1]; // " is a "
  let str2 = strings[2]; // "."
  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${ageExp}`;
}
tagFunction`That ${ person } is a ${ age }.`
// That Mike is a 18.
```

### ** nullish coalescing
nullish coalescing operator `??` uses the right value if left is `null` or `undefined`.

### ** OR coalescing
The OR operator `||` uses the right value if left is falsy.

### ** Optional chaining
The optional chaining operator `?.` enables you to read the value of a property located deep
within a chain of connected objects without having to check that each reference in the chain is valid.
Instead of causing an error if a reference is nullish (`null` or `undefined`),
the expression short-circuits with a return value of `undefined`.
When used with function calls, it returns `undefined` if the given function does not exist.
```typescript
object?.someNonExistentMethod?.()
```

### *** nullish coalescing vs OR coalescing
OR operator `||` can be problematic if your left value might contain `""` or `0` or `false`
(because these are falsy values).

### *** Tagged templates

### *** Converting an object to a primitive value (valueof/symbol.ToPrimitive)

### **** Reflection API

### **** Create decorators using the reflection

