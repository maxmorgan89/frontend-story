## Utility types

### Partial<Type>

Constructs a type with all properties of Type set to optional. This utility will return a type
that represents all subsets of a given type.

```typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
  description: 'throw out trash',
});
```

### Required<Type>

Constructs a type consisting of all properties of Type set to required. The opposite of Partial.

```typescript
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 };
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

### Readonly<Type>

Constructs a type with all properties of Type set to readonly, meaning the properties of the
constructed type cannot be reassigned.

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
};

todo.title = 'Hello';
// Cannot assign to 'title' because it is a read-only property.
```

This utility is useful for representing assignment expressions that will fail at runtime
(i.e. when attempting to reassign properties of a frozen object).

```typescript
function freeze<Type>(obj: Type): Readonly<Type> {}
```

### Record<Keys, Type>

Constructs an object type whose property keys are Keys and whose property values are Type.
This utility can be used to map the properties of a type to another type.

```typescript
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};

cats.boris;

// const cats: Record<CatName, CatInfo>
```

### Pick<Type, Keys>

Constructs a type by picking the set of properties Keys (string literal or union of string
literals) from Type.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```
