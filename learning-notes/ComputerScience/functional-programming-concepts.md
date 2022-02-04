# Functional programming concepts
###\* Functional Programming basics
Functional programming is a declarative programming paradigm that writes in pure functions,
meaning that these functions do not modify variables but instead generate new ones as an output.
In other words, the output of a pure function only depends on the input parameters;
thus, there is no external impact, which avoids side effects.
Moreover, writing pure functions also helps developers avert (avoid) mutable data and shared state.
###\* [Shared state](https://thejs.dev/jmitchell/what-are-side-effects-and-what-you-can-do-about-them-jws)
A shared state is any kind of shared state, an object, variable or memory space,
that exists in a shared scope, such as closures, classes, functions and even global scopes,
or as the input property being passed through functions.

The problem with shared state is by virtue its shared nature;
you need to know the history of the object,
shared events and other potential points of mutation and interaction.

A common side effect of shared state are race conditions.
For example, imagine you have a User object, with a function saveUser(), which makes a request to an API.
While that process is happening, the user modifies their profile and saves their data again,
thus calling saveUser() a second time. Unfortunately for the user,
the second request was received, processed, and their record updated before the first one completed.

Another problem with shared state is the cascading function problem,
in which the order and even timing of function calls has to be changed as the state changes.
This is typically a side effect of changing the order of functions calls, which causes a cascade of errors.

Introducing pure functions following the functional programming paradigm helps us avoid shared state,
thus avoiding issues such as cascading function errors,
potential race conditions, and situations where state is stale.
###\* Side effect
A side effect is the modification of state through the invocation of a function or expression.
In order for a function or expression to have a side effect, the state it modifies should be out of its local scope.
Such as passing an object by reference through functions to be mutated and performing I/O operations.
###\* Function Composition
Function composition is the process of combining two or more functions to produce a new function.
Composing functions together is like snapping together a series of pipes for our data to flow through.

Put simply, a composition of functions `f` and `g` can be defined as `f(g(x))`,
which evaluates from the inside out — right to left.

Compose function takes any number of functions and invokes them all one after the other:
```typescript
// function composition of any number of functions
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x); 
const double = x => x * 2
const square = x => x * x

// function composition
var output_final = compose(square, double)(2);
console.log(output_final);
```
On the other hand, we can reverse the order of the function invocation by using the pipe function:
```typescript
// function composition using pipe of any number of functions
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 
const double = x => x * 2
const square = x => x * x

// function pipe
var output_final = pipe(square, double)(2);
console.log(output_final);
```
This is similar to the previous compose function,
except that it uses `reduce` instead of the `reduceRight` method.
The output is different in this case because the square function is invoked before the double function while,
in our compose function, it was in the opposite order.
###\* Pure function
A pure function is a function which:
- Given the same input, always returns the same output.
- Produces no side effects.

Pure functions are all about mapping. Functions map input arguments to return values,
meaning that for each set of inputs, there exists an output.

A dead giveaway that a function is impure is if it makes sense to call it without using its return value.
For pure functions, that’s a noop.
###\* Higher-order function
A higher order function is a function that takes a function as an argument, or returns a function.
Higher order function is in contrast to first order functions,
which don’t take a function as an argument or return a function as output.
###\** Pros and cons of FP comparing to OOP and procedural languages. Main use cases.
Functional programming relies on functions, whereas object-oriented programming is
based on classes and respective objects.
A function is a process that retrieves a data input, processes it, and then returns an output.

| Functional Programming          | OOP                                                                                                                                                                                   |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A function is the primary unit. | Objects are the main unit.                                                                                                                                                            |
| Pure functions do not have side-effects. | The methods may have side effects.                                                                                                                                                    | 
| Follows a more declarative programming model. | Mainly follows an imperative programming approach.                                                                                                                                    |
| In pure functional programming languages it is impossible to create mutable objects. Thus, objects are typically immutable. | In OOP languages, the answer is not that straightforward since it depends more on the specifications of each OOP language. Hence, OOP can support both mutable and immutable objects. |
| Functional programming writes pure functions. Pure functions only produce outputs with identical inputs. Consequently, functional programming is extremely operational, practical, and, as the name indicates, functional. |OOP is not as operational as Functional programming. In fact, OOP stores data in objects, and the data is prioritized over the operations.                                                                                                                                                                                       |

Declarative programming is a programming paradigm that declares what the program has to accomplish.
It does not declare how the program should accomplish a certain computation throughout the control flow;
it just declares what it wants without explaining how to get it. 
In contrast, imperative programming relies on a sequence of statements to modify a program's state,
providing a detailed description for each step on how to accomplish a certain goal.

Procedural programming is an imperative programming paradigm built around the idea 
that programs are sequences of instructions to be executed.
They focus heavily on splitting up programs into named sets of instructions called procedures,
analogous to functions. A procedure can store local data
that is not accessible from outside the procedure’s scope and can also access and modify global data variables.

###\** Curried function
###\** Partial application
###\*** Functor
[Functors, Applicatives, And Monads In Pictures](https://medium.com/@tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221#.rdwll124i)

A functor is any type that defines how `map` works.
A functor is anything that can be mapped over. This is most commonly a list,
but really it's any object that can be mapped over.

###\*** Endofunctor
###\*** Monad
A monad is a type that implements flatMap.
###\*** Applicative
An applicative is a type that implements ap.
With an applicative, our values are wrapped in a container, just like Functors.
But our functions are wrapped in a container too!
###\*** [Tail recursion vs non-tail recursion](https://2ality.com/2015/06/tail-call-optimization.html)
> Update 2018-05-09: Even though tail call optimization is part of the language specification,
> [it isn’t supported by many engines and that may never change](https://kangax.github.io/compat-table/es6/#test-proper_tail_calls_(tail_call_optimisation)).

A tail call is a function call that appears at the tail of another function,
such that after the call finishes, there’s nothing left to do.

Calling a new function requires an extra amount of reserved memory to manage the called a stack frame.
So the preceding snippet would generally require a stack frame for each call.
However, if a TailCallOptimisation-capable engine can realize that the doA(b+1) call is in tail position
meaning doB(b) is basically complete, then when calling doA(b+1), it does not need to create a new stack frame,
but can instead reuse the existing stack frame from doB(b). That’s faster and uses less memory.
```typescript
function doA(a) { // Some function.
    return a;
}
function doB(b) {
    return doA( b + 1 ); // Tail call.
}
function foo() {
    return 20 + doB(10); // Not tail call.
}
foo(); // 31
```
###\*** Can you describe difference of memory usage between mutable and immutable data?
If an item is mutable, modifying the copy also modifies the original.
If it’s immutable, modifying the copy does not affect the original.

It’s confusing because immutable sounds like the item can’t be changed.
What it actually means, though, is that the original is not changed when the copy is.

The Object.assign(), Array.slice(), and Array.from() methods all create shallow copies.
If an object has arrays in it, or an array has objects in it, those are not immutable copies.
The stringify() and parse() trick avoids this issue, but only works for valid JSON values.
Functions and certain other values are not copied over.

Without immutability, you might have to pass an object around between different scopes,
and you do not know beforehand if and when the object will be changed.
So to avoid unwanted side effects,
you start creating a full copy of the object "just in case" and pass that copy around,
even if it turns out no property has to be changed at all.
That will leave a lot more garbage.

- If you design a data structure with only a few attributes based on primitive or other immutable types,
try immutability first.
- If you want to design a data type where arrays with large (or undefined) size,
random access and changing contents are involved, use mutability.
