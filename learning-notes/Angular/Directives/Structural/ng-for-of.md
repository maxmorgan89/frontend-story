## [NgForOf](https://angular.io/api/common/NgForOf)

A structural directive that renders a template for each item in a collection. The directive
is placed on an element, which becomes the parent of the cloned templates.

### Description

The `ngForOf` directive is generally used in the shorthand form `*ngFor`.

```angular2html
<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>

<!--expanded version of the short-form example-->
<ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
    <li>...</li>
</ng-template>
```

### Local variables

- `$implicit: T`: The value of the individual items in the iterable (ngForOf).
- `ngForOf: NgIterable<T>`: The value of the iterable expression. Useful when the expression
  is more complex than a property access, for example when using the async pipe (userStreams |
  async).
- `index: number`: The index of the current item in the iterable.
- `count: number`: The length of the iterable.
- `first: boolean`: True when the item is the first item in the iterable.
- `last: boolean`: True when the item is the last item in the iterable.
- `even: boolean`: True when the item has an even index in the iterable.
- `odd: boolean`: True when the item has an odd index in the iterable.

### Change propagation
When the contents of the iterator changes, NgForOf makes the corresponding changes to the DOM:

- When an item is added, a new instance of the template is added to the DOM.
- When an item is removed, its template instance is removed from the DOM.
- When items are reordered, their respective templates are reordered in the DOM.

Angular uses object identity to track insertions and deletions within the iterator and reproduce
those changes in the DOM.

The identities of elements in the iterator can change while the data does not. This can happen,
for example, if the iterator is produced from an RPC to the server, and that RPC is re-run.
Even if the data hasn't changed, the second response produces objects with different identities,
and Angular must tear down the entire DOM and rebuild it (as if all old elements were deleted
and all new elements inserted).

To avoid this expensive operation, you can customize the default tracking algorithm by
supplying the `trackBy` option to `NgForOf`. `trackBy` takes a function that has two
arguments: `index` and `item`. If `trackBy` is given, Angular tracks changes by the return
value of the function.

