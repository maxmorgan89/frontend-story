#Functional programming concepts
###\* What is a pure function / shared state / side effect?
###\* What is a higher-order function?
###\** Pros and cons of FP comparing to OOP and procedural languages. Main use cases.
###\** What is a curried function? What is a partial application?
###\*** Functor
[Functors, Applicatives, And Monads In Pictures](https://medium.com/@tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221#.rdwll124i)

A functor is any type that defines how `map` works.
A functor is anything that can be mapped over. This is most commonly a list,
but really it's any object that can be mapped over.

###\*** Endofunctor
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
