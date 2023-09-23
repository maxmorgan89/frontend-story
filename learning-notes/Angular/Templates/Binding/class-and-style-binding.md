## [Class and style binding](https://angular.io/guide/class-binding)

Use class and style bindings to add and remove CSS class names from an element's `class` attribute
and to set styles dynamically.

### Binding to a single CSS class

```angular2html
[class.sale]="onSale" // onSale: boolean
```

### Binding to multiple CSS classes

```angular2html
[class]="classExpression"
```

The expression can be one of:

1. A space-delimited string of class names. `"my-class-1 my-class-2 my-class-3": string`
2. An object with class names as the keys and truthy or falsy expressions as the values.
   `{foo: true, bar: false}: Record<string, boolean | undefined | null>`
3. An array of class names. `['foo', 'bar']: Aray<string>`

### Binding to a single style

To create a single style binding, use the prefix `style` followed by a dot and the name of
the CSS style.

1. To write a style in dash-case, type the following:

```angular2html
<nav [style.background-color]="expression"></nav>
```

2. To write a style in camelCase, type the following:

```angular2html
<nav [style.backgroundColor]="expression"></nav>
```

3. Single style binding with units:
```angular2html
<nav [style.width.px]="width"></nav>
```



### Binding to multiple styles

To toggle multiple styles, bind to the `[style]` attribute—for example,
`[style]="styleExpression"`. The styleExpression can be one of:

1. A string list of styles such as `"width: 100px; height: 100px; background-color: cornflowerblue;"`.
2. An object with style names as the keys and style values as the values, such as `{width: '100px', 
   height: '100px', backgroundColor: 'cornflowerblue'}`.


