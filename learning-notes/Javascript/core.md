# JS Core
###\* Primitive values
JavaScript has 7 primitive data types:

1. null
2. undefined
3. boolean
4. number
5. string
6. symbol – available only from ES2015
7. BigInt – available from ES2020

And one complex Data Type - object.
###\* Are primitive values/objects mutable or immutable?
All primitives are immutable, i.e., they cannot be altered. It is important not to
confuse a primitive itself with a variable assigned a primitive value.
The variable may be reassigned a new value, but the existing value can not be changed
in the ways that objects, arrays, and functions can be altered.
###\* How does coercion work? Describe how it compares the following: 3 > 2 > 1
Type **Coercion** refers to the process of automatic or implicit conversion of values
from one data type to another. This includes conversion from Number to String,
String to Number, Boolean to Number etc. when different types of operators are
applied to the values. Constructors of a data type can be used to convert any
value to that datatype, like the Number(), String() or Boolean() constructor.

`3 > 2 > 1`

`3 > 2` - true

`true > 1` - false, because `Number(true)` - 1, and `1 > 1` - false
###\* Can we delete (using delete operator) any property declared with var/let/const from the global scope or from a function's scope?
No. The JavaScript delete operator removes a property from an object;
if no more references to the same property are held, it is eventually released automatically.
###\* Iterating over arrays
- for loop
- while loop
- forEach method
- every method
- map
- filter
- reduce
- some
###\* Iterating over objects
#### Using a for...in loop
This method works in all modern and old browsers including Internet Explorer 6 and higher.
One problem in using the for...in method is that it loops through the properties
in the prototype chain as well. Since the objects in JavaScript can inherit properties
from their prototypes, the for...in statement will loop through those properties as well.

To avoid this problem, you have to explicitly check if the property belongs to
the object by using the hasOwnProperty() method:
```typescript
for (const key in user) {
    if (user.hasOwnProperty(key)) {
        console.log(`${key}: ${user[key]}`);
    }
}
```
To overcome this hassle, later in ES8, two other methods were added, Object.entries() and Object.values().
#### Object.keys method
Before ES6, the only way to loop through an object was through using the for...in loop.
The Object.keys() method was introduced in ES6 to make it easier to loop over objects.

It takes the object that you want to loop over as an argument and returns an
array containing all properties names (or keys).
```typescript
const keys = Object.keys(courses);
keys.forEach((key, index) => {
  console.log(`${key}: ${courses[key]}`);
});
```
#### Object.values method
The Object.values() method was introduced in ES8 and it works opposite to that of Object.key().
It returns the values of all properties in the object as an array.
You can then loop through the values array by using any of the array looping methods.
```typescript
Object.values(animals).forEach(val => console.log(val));
```
#### Object.entries method
The Object.entries(), an other ES8 method can be used for traversing an array.
Object.entries() outputs an array of arrays, with each inner array having two elements.
The first element being the property and the second element is the value.
```typescript
// `for...of` loop
for (const [key, value] of Object.entries(animals)) {
    console.log(`${key}: ${value}`);
}

// `forEach()` method
Object.entries(animals).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
});
```
###\* Functions
A function is a block of code that performs a specific task.

###\* Precedence
###\** let
###\** const
###\** Class
###\** Arrow function
###\** Spread operator
###\** Rest operator
###\** Destructuring
###\** String templates
###\** nullish coalescing
nullish coalescing operator `??` uses the right value if left is null or undefined
###\** OR coalescing
The OR operator `||` uses the right value if left is falsy
###\** Optional chaining
The optional chaining operator `?.` enables you to read the value of a property located deep
within a chain of connected objects without having to check that each reference in the chain is valid.
###\*** nullish coalescing vs OR coalescing
OR operator || can be problematic if your left value might contain "" or 0 or false
(because these are falsy values)
###\*** Generators
###\*** Iterators
###\*** Proxy
###\*** Tagged templates
###\*** Converting an object to a primitive value (valueof/symbol.ToPrimitive)
###\**** Reflection API
###\**** Create decorators using the reflection

