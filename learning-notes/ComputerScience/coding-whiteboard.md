#Coding whiteboard problem-solving
###\* Implement an isPalindrome function
A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward.
> Note: You’ll need to remove all non-alphanumeric characters (punctuation, spaces and symbols)
> and turn everything lowercase in order to check for palindromes.

```typescript
function palindrome(str: string): boolean {
  let wordsRegularExpression = /[\W_]/g;
  let lowRegStr = str.toLowerCase().replace(wordsRegularExpression, '');
  let reverseStr = lowRegStr.split('').reverse().join(''); 
  return reverseStr === lowRegStr;
}
palindrome("A man, a plan, a canal. Panama");
```
###\* Implement an isInteger function
```typescript
function isInteger(value: unknown): boolean { 
  return typeof value === 'number' &&  
    isFinite(value) &&  
    Math.floor(value) === value; 
};
```
###\* Implement a function to find all duplicates in an array
```typescript
const numbers = [1, 2, 3, 2, 4, 5, 5, 6];
// Set will contain only uinique numbers.
const set = new Set(numbers);
const duplicates = numbers.filter(item => {
    if (set.has(item)) {
        set.delete(item);
    } else {
        return item;
    }
});
```
###\** Implement a map function
```typescript
type IterableObject = {
  [key: string]: unknown,
}

function mapObject<Item extends IterableObject>(inputObject: Item, iteratee: (objectItem: Item[keyof Item], objectKey: string, c: Item) => Item[keyof Item], context?: unknown): Item {
  const results: IterableObject = {} ;

  for (const key in Object.keys(inputObject)) {
    results[key] = iteratee.call(context, inputObject[key] as Item[keyof Item], key, inputObject);
  }

  return results as Item;
}

console.log(mapObject({a: 3, b: '7'}, (x) => Number.parseInt(x.toString()) + 5));

function mapArray<Item>(array: Item[], iteratee: (arrayItem: Item, index: number, array: Item[]) => Item, context?: unknown): Item[] {
  const results: Item[] = Array(array.length);

  for (let index = 0; index < array.length; index++) {
    results[index] = iteratee.call(context, array[index], index, array);
  }

  return results;
}

console.log(mapArray([3, '7'], (x) => Number.parseInt(x.toString()) + 5));
```
###\** Implement a cloneDeep function

Problems with cloning:
- every object/instance might have some state
- private variables
- arguments dependency. Some arguments (other objects or classes) may probably be created in some context, and that context is unknown for clone method
So, better to implement `.clone()` method on the object itself.
```typescript
```
###\** Implement a curried function
```typescript
```
###\** Implement a function to get a random integer between two values
```typescript
```
###\** Implement a chunk function that creates an array of elements split into groups the length of size
```typescript
```
###\** Implement a flattenDeep  function that recursively flattens array
```typescript
```
###\*** [Binary search tree](https://www.digitalocean.com/community/tutorials/js-binary-search-trees)
In computer science, a tree is a widely used abstract data type that simulates a hierarchical tree structure,
with a root value and subtrees of children with a parent node, represented as a set of linked nodes.

A binary tree is a tree data structure that includes nodes with at most two children i.e. a right and left child.

A binary search tree just has the additional rule that if there’s two values then they need to be ordered,
in our case from the lower number on the left to the higher on the right.
Searching on a binary search tree is a large improvement on
our original `O(n)` search speed since now to find something we
just need to compare what we want to each parent node before
moving left or right until we’re at what we want,
giving us `O(logn)` for all operations.

#### Create
Very similar to linked lists we can use classes to generate our nodes and tree.
Each node only really needs a pointer to the left/less and right/greater sides, the value,
and I personally like to add a counter since repeated values can only exist once in the tree.
```typescript
class Node {
  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
    this.count = 0;
  };
};

class BST {
  constructor() {
    this.root = null;
  }
  create(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    };
    let current = this.root;

    const addSide = side => {
      if (!current[side]) {
        current[side] = newNode;
        return this;
      };
      current = current[side];
    };

    while (true) {
      if (val === current.val) {
        current.count++;
        return this;
      };
      if (val < current.val) addSide('left');
      else addSide('right');
    };
  };
};

let tree = new BST();
tree.add(10);
tree.add(4);
tree.add(4);
tree.add(12);
tree.add(2);
console.log(tree);
```
##### Find
Finding something is incredibly simple, 
just move left or right relative to the current value and return `true` if we hit something that matches.
```typescript
function find(val) {
  if (!this.root) return undefined;
  let current = this.root,
      found = false;

  while (current && !found) {
    if (val < current.val) current = current.left;
    else if (val > current.val) current = current.right;
    else found = true;
  };

  if (!found) return 'Nothing Found!';
  return current;
};
```

```typescript
let BreadthFirstSearch = (tree, rootNode, searchValue) => {
  // make a queue array
  let queue = [];
  // populate it with the node that will be the root of your search
  queue.push(rootNode);

	// search the queue until it is empty
  while (queue.length > 0) {
    // assign the top of the queue to variable currentNode
    let currentNode = queue[0];
    console.log("Current node is:" + currentNode.value);
    
    // if currentNode is the node we're searching for, break & alert
    if (currentNode.value === searchValue) {
      console.log("Found it!");
      return;
    }
    
    // if currentNode has a left child node, add it to the queue.
    if (currentNode.left !== null) {
      queue.push(tree[currentNode.left]);
    }
    
    // if currentNode has a right child node, add it to the queue.
    if (currentNode.right !== null) {
      queue.push(tree[currentNode.right]);
    }
    // remove the currentNode from the queue.
    queue.shift();
  }
  console.log("Sorry, no such node found :(");	
}
```
#### Delete
[See link.](https://www.digitalocean.com/community/tutorials/js-binary-search-trees)
###\*** [Implement a memoize function that takes in a function and returns a memoized one](https://www.section.io/engineering-education/an-introduction-to-memoization-in-javascript/)
Memoization is a technique of caching results of expensive function calls to speed up computer programs
by returning the cached result when the same input occurs again.

When a function is called, 
memoization stores the function results before it returns the result to the function caller.
This way, when another caller point to the results of this function,
Memoization will return the result stored (cached) in the memory, 
and the function will not be executed over and over again.

A memoized function should be a pure function.
This means the function execution does not mutate.
When called with a certain input, 
it should always return the same value regardless of how many times the function will be called.

Memoization is useful in recursions.
```typescript
// function that takes a function and returns a function
const memoize = (func) => {
  // a cache of results
  const results = {};
  // return a function for the cache of results
  return (...args) => {
    // a JSON key to save the results cache
    const argsKey = JSON.stringify(args);
    // execute `func` only if there is no cached value of clumsysquare()
    if (!results[argsKey]) {
      // store the return value of clumsysquare()
      results[argsKey] = func(...args);
    }
    // return the cached results
    return results[argsKey];
  };
};

const fibonacci = memoize((n) => {
  // if n is equal to 1 return the first term 1
  if (n === 1) {
    return 1;
  }
  // if n is equal 2 1 return the second term 1
  else if (n === 2) {
    return 1;
  }
  // else n is larger than two, return the sum of the previous two terms
  else {
      return fibonacci(n - 1) + fibonacci(n - 2);
  }
});
```
###\*** Serialize and deserialize binary tree
```typescript
```

