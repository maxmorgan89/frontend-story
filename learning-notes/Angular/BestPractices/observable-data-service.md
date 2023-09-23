## Observable data service

### What is an observable data service

An observable data service is an Angular injectable service that can be used to provide data
to multiple parts of the application. The service, that can be named a store can be injected
in any place where the data is needed

### How to use an observable data service

The data service exposes an observable, for example `TodoStore` exposes the `todos` observable.
Each value of this observable is a new list of `todos`.

The data service can then be used directly in the templates using the async pipe:

```angular2html
<ul id="todo-list">
    <li *ngFor="let todo of todoStore.todos | async" >
        ...
    </li>
</ul>
```

This pipe will subscribe to the `todos` observable and retrieve its last value.

### How to modify the data of a service
The data in services is modified by calling action methods on them, for example:

```typescript
onAddTodo(description) {
    this.todoStore.addTodo(newTodo)
        .subscribe(
            res => {},
            err => {
                this.uiStateStore.endBackendAction();
            }
        );
}
```

The data store will then emit a new value for its data depending on the action method call,
and all subscribers will receive the new value and update accordingly.

### A couple of interesting things about observable data services
Notice that the users of the `TodoStore` don't know what triggered a new list of todos
being emitted: and add todo, delete or toggle todo. The consumers of the store are only aware
that a new value is available and the view will be adapted accordingly. This effectively
decouples the multiple parts of the application, as the consumers of the data are not aware
of the modifiers.

Notice also that the smart components of the application where the store is injected do not
have any state variables, which is a good thing as these are a common source of programming errors.

Also of note is the fact that nowhere in the smart components is an Http backend service being
directly used, only calls to the store are made to trigger a data modification.

### How to build an Observable Data Service

```typescript
@Injectable()
export class TodoStore {
    private _todos: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

    public readonly todos: Observable<List<Todo>> = this._todos.asObservable();

    constructor(private todoBackendService: TodoBackendService) {
        this.loadInitialData();
    }
    ...
}
```

### Pitfall #1 - don't expose subjects directly

In this example we don't expose the subject directly to store clients, instead, we expose
an observable.

This is to prevent the service clients from themselves emitting store values directly instead
of calling action methods and therefore bypassing the store.

### Pitfall #2 - avoid duplicate HTTP calls

One thing to bear in mind in this example is that the observable return by Http would have
two subscribers: one inside the `addTodo` method, and the subscriber calling `addTodo`.

This would cause (due to the way that observables work by default) a duplicate HTTP call,
because two separate processing chains are set up.

To fix this issue, we could do for example the following, to ensure that no duplicate
http calls can occur:

```typescript
saveTodo(newTodo: Todo) : Observable> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post('/todo', JSON.stringify(newTodo.toJS()),{headers})
        .pipe(
            shareReplay()
        );
}
```

Beware of the tradeoffs of returning a shared observable instead of the plain HTTP observable
directly:

- now there are no duplicate network calls
- but the callers of saveTodo might not be able to do certain operations themselves (like retry).

For most CRUD-style data modification operations, this is actually a very good compromise.

For CRUD operations, we don't expect a new call to the backend to be made with every
subscription to the Observable returned by the service layer.

Instead, we want to be able to build our view layer without worrying about duplicate data
modification calls.

So for most CRUD backend operations, returning a shared observable from the service layer
using `shareReplay()` tends to work very well.



