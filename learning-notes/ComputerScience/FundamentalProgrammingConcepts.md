# Fundamental ProgrammingConcepts
###\* Primitive Data Types
JavaScript has the primitive data types:

1. null
2. undefined
3. boolean
4. number
5. string
6. symbol – available only from ES2015
7. BigInt – available from ES2020

JavaScript is a dynamically typed language. 
It means that a variable does not associate with a type.
In other words, a variable can hold values of different types.

#### undefined
The undefined type is a primitive type that has only one value undefined.
By default, when a variable is declared but not initialized, it is assigned the value undefined.

#### null
The null type is the second primitive data type that also has only one value: null.
null is equal to undefined:
```typescript
console.log(null == undefined); // true
```
typeof null is object:
```typescript
console.log(typeof null); // object
```

#### number
JavaScript uses the number type to represent both integer and floating-point numbers.
To represent a floating-point number, you include a decimal point followed by at least one number:
```typescript
let price= 12.5;
```
JavaScript automatically converts a floating-point number into
an integer number if the number appears to be a whole number.
The reason is that Javascript always wants to use less memory
since a floating-point value uses twice as much memory as an integer value.

#### NaN
NaN stands for Not a Number. It is a special numeric value that indicates an invalid number.

#### string
In JavaScript, a string is a sequence of zero or more characters.
JavaScript's strings are immutable. This means that you cannot modify a string once it is created.
However, you can create a new string based on another string.

###\* Difference between == and ===
###\* Result of adding 1 to max value of integer
###\** Why 0.1+0.2 != 0.3 ? How to compare floating numbers?
###\** Data Structures
###\** Stack
###\** Queue
###\** Array
###\** List
###\** What's the difference between an Object (JavaScript Object) and a Map?
###\** Describe steps of Breadth-First Search (or Depth-First Search) for graphs
###\** Name Big-O complexities in growth order
###\** Estimate Big-O complexity of coding task solution

									
