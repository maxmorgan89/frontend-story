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
let price= 12.5;
```
JavaScript automatically converts a floating-point number into
an integer number if the number appears to be a whole number.
The reason is that Javascript always wants to use less memory
since a floating-point value uses twice as much memory as an integer value.

The JavaScript **Number.EPSILON** property
represents the difference between 1 and the smallest floating point number greater than 1.
**Number.EPSILON** can be used to test the equality of the floating-point numbers (but there is an issue with it).
```typescript
console.log(Number.EPSILON); // 2.220446049250313e-16

const a = 0.1;
const b = 0.2;
const c = 0.3;

console.log(a + b == c); // false

console.log(a + b - c < Number.EPSILON); // true
```
[How to compare numbers correctly in JavaScript](https://dev.to/alldanielscott/how-to-compare-numbers-correctly-in-javascript-1l4i)
> Result of adding 1 to max value of integer
Operation completes successfully, initial value would not change.

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
### BigInt
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
