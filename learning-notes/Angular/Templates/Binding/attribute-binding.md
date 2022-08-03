## [Attribute binding](https://angular.io/guide/attribute-binding)

Attribute binding in Angular helps you set values for attributes directly. With attribute binding,
you can improve accessibility, style your application dynamically, and manage multiple CSS classes
or styles simultaneously.

### Syntax
Attribute binding syntax resembles property binding, but instead of an element property betwee
n brackets, you precede the name of the attribute with the prefix `attr`, followed by a dot.
Then, you set the attribute value with an expression that resolves to a string.

```angular2html
<p [attr.attribute-you-are-targeting]="expression"></p>
```
