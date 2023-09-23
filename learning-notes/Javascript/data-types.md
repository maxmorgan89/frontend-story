# Primitive Data Types

JavaScript has 7 primitive data types:

1. null
2. undefined
3. boolean
4. number
5. string
6. symbol – available only from ES2015
7. BigInt – available from ES2020

And one complex Data Type - object.

JavaScript is a dynamically typed language.
It means that a variable does not associate with a type.
In other words, a variable can hold values of different types.

## undefined

The undefined type is a primitive type that has only one value undefined.
By default, when a variable is declared but not initialized, it is assigned the value undefined.

## null

The null type is the second primitive data type that also has only one value: null.
null is equal to undefined:

```typescript
console.log(null == undefined); // true
```

typeof null is object:

```typescript
console.log(typeof null); // object
```

## number

JavaScript uses the number type to represent both integer and floating-point numbers.
To represent a floating-point number, you include a decimal point followed by at least one number:

```typescript
let price = 12.5;
```

JavaScript automatically converts a floating-point number into
an integer number if the number appears to be a whole number.
The reason is that Javascript always wants to use less memory
since a floating-point value uses twice as much memory as an integer value.

The JavaScript **Number.EPSILON** property
represents the difference between 1 and the smallest floating point number greater than 1.
**Number.EPSILON** can be used to test the equality of the floating-point numbers (but there
is an issue with it).

```typescript
console.log(Number.EPSILON); // 2.220446049250313e-16

const a = 0.1;
const b = 0.2;
const c = 0.3;

console.log(a + b == c); // false

console.log(a + b - c < Number.EPSILON); // true
```

You can use your own epsilon number, like 0.001, that will be reasonable for comparing
numbers in some particular case. For example, you don't need `Number.EPSILON` if you compare meters.

[How to compare numbers correctly in JavaScript](https://dev.to/alldanielscott/how-to-compare-numbers-correctly-in-javascript-1l4i)

> Result of adding 1 to max value of integer
> Operation completes successfully, initial value would not change.

## NaN

NaN stands for Not a Number. It is a special numeric value that indicates an invalid number.

## string

In JavaScript, a string is a sequence of zero or more characters.
JavaScript's strings are immutable. This means that you cannot modify a string once it is created.
However, you can create a new string based on another string.

## boolean

To convert a value of another data type into a boolean value, you use the `Boolean()` function.

## Symbol

ES6 added Symbol as a new primitive type.
Unlike other primitive types such as number, boolean, null, undefined, and string,
the symbol type does not have a literal form.

```typescript
let s1 = Symbol('Symbol descrition text');
```

- Symbol can take a key as parameter
- Every symbol value returned from Symbol is unique

```typescript
let symbol1 = Symbol('Some Description'),
  symbol2 = Symbol('Some Description');
console.log(symbol1); // "Symbol(Some Description)"
console.log(symbol1 === symbol2); // here we will get `false`
```

Symbol provides two static functions .for(key) and .keyFor(symbol):

- .for(key) function - method searches for existing symbols
  in a runtime-wide symbol registry with the given key and returns it if found.
  Otherwise, a new symbol gets created in the global symbol registry with this key.

```typescript
const symbol1 = Symbol.for('globalSymbol');
const symbol2 = Symbol.for('globalSymbol');
console.log(symbol1 === symbol2); // true
console.log(Symbol.for('globalSymbol') === Symbol.for('globalSymbol')); // true
```

- .keyFor(symbol) - method retrieves a shared symbol key
  from the global symbol registry for the given symbol.
  `Symbol.keyFor(symbol)` returns undefined for local symbol

```typescript
let globalSymbol = Symbol.for('foo'); // global symbol
console.log(Symbol.keyFor(globalSymbol)); // "foo"

let localSymbol = Symbol('Hello');
console.log(Symbol.keyFor(localSymbol)); // undefined
```

#### [Well known Symbols](https://2ality.com/2015/09/well-known-symbols-es6.html)

All well-known symbols in ES6 are keys for properties.
If you add a property to an object that has one of those keys,
you change how ES6 treats that object.
These are all well-known symbols in ES6:

1. Customizing basic language operations:

- `Symbol.hasInstance` (method) customizes instanceof.
- `Symbol.toPrimitive` (method) customizes the coercion
  of an object to a primitive value.
- `Symbol.toStringTag (string)`
  customizes the result returned by Object.prototype.toString().

2. Iteration:

- `Symbol.iterator` (method)
  A method with this key makes an object iterable
  (its elements can be iterated over language constructs
  such as the for-of loop and the spread operator (...)).

3. Forwarding calls from string methods to their parameters:

- `Symbol.match`
- `Symbol.replace`
- `Symbol.search`
- `Symbol.split`

4. Miscellaneous:

- `Symbol.unscopables` (Object)
  lets you hide some properties from the with statement.
- `Symbol.species` (method)
  configures how built-in methods create objects
  that are similar to this.
- `Symbol.isConcatSpreadable` (boolean)
  configures whether Array.prototype.concat()
  adds the indexed elements of an object to its result (“spreading”)
  or the object as a single element.

## BigInt

ES2020 introduced a new built-in object called BigInt that allows you to represent whole numbers larger 2^53 – 1.

To make a BigInt, you append n to the end of an integer literal or call the function `BigInt()`:

```typescript
let bigInt = 9007199254740991n;
let bigerInt = BigInt(9007199254740991);

console.log(typeof BigInt(100) === 'bigint'); // true

console.log(1n === 1); // false
console.log(1n == 1); // true

console.log(1n < 2); // true
console.log(2n > 1); // true
console.log(2n >= 2); // true
```

## Object

Used to store various keyed collections and more complex entities.
Objects can be created using the Object() constructor or the object initializer (Object.create()) / literal syntax ({}).
An object initializer is a comma-delimited list of zero or more pairs of property
names and associated values of an object, enclosed in curly braces ({}).
