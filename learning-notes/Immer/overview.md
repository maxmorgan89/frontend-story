## [Immer](https://immerjs.github.io/immer/)

Immer (German for: always) is a tiny package that allows you to work with immutable state in
a more convenient way.

### Immer simplifies handling immutable data structures

Immer can be used in any context in which immutable data structures need to be used.
For example in combination with React state, React or Redux reducers, or configuration management.
Immutable data structures allow for (efficient) change detection: **if the reference to an object
didn't change, the object itself did not change**. In addition, it makes cloning relatively
cheap: Unchanged parts of a data tree don't need to be copied and are shared in memory with
older versions of the same state.

Generally speaking, these benefits can be achieved by making sure you never change any property
of an object, array or map, but by always creating an altered copy instead.

Immer will help you to follow the immutable data paradigm by addressing these pain points:

- Immer will detect accidental mutations and throw an error.
- Immer will remove the need for the typical boilerplate code that is needed when creating deep 
  updates to immutable objects: Without Immer, object copies need to be made by hand at every
  level. Typically by using a lot of `...` spread operations. When using Immer, changes are made to 
  a draft object, that records the changes and takes care of creating the necessary copies,
  without ever affecting the original object.
- When using Immer, you don't need to learn dedicated APIs or data structures to benefit from the 
  paradigm. With Immer you'll use plain JavaScript data structures, and use the well-known 
  mutable JavaScript APIs, but safely.

### Example

We can leverage the produce function, which takes as first argument the state we want to
start from, and as second argument we pass a function, called the recipe, that is passed a draft
to which we can apply straightforward mutations. Those mutations are recorded and used to produce
the next state once the recipe is done. produce will take care of all the necessary copying,
and protect against future accidental modifications as well by freezing the data.

```typescript
import produce from "immer"

const nextState = produce(baseState, draft => {
    draft[1].done = true
    draft.push({title: "Tweet about it"})
})
```

### How Immer works

The basic idea is that with Immer you will apply all your changes to a temporary draft,
which is a proxy of the currentState. Once all your mutations are completed, Immer will produce
the nextState based on the mutations to the draft state. This means that you can interact
with your data by simply modifying it while keeping all the benefits of immutable data.

![immer.png](images/immer.png)

