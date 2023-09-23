## [View encapsulation](https://angular.io/guide/view-encapsulation)
In Angular, a component's styles can be encapsulated within the component's host element so
that they don't affect the rest of the application.

The `Component`'s decorator provides the `encapsulation` option which can be used to control
how the encapsulation is applied on a per component basis.

###### ViewEncapsulation.ShadowDom
Angular uses the browser's built-in
[Shadow DOM API](https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM)
to enclose the component's view inside a ShadowRoot (used as the component's host element)
and apply the provided styles in an isolated manner.
> `ViewEncapsulation.ShadowDom` only works on browsers that have built-in support for the shadow DOM

###### ViewEncapsulation.Emulated
Angular modifies the component's CSS selectors so that they are only applied to the component's
view and do not affect other elements in the application (emulating Shadow DOM behavior).

###### ViewEncapsulation.None
Angular does not apply any sort of view encapsulation meaning that any styles specified for the
component are actually globally applied and can affect any HTML element present within
the application. This mode is essentially the same as including the styles into the HTML itself.

### Mixing encapsulation modes
As previously mentioned you specify the encapsulation mode in the Component's decorator on a per
component basis, this means that within your application you can have different components
using different encapsulation strategies.

Although possible, this is not recommended. If it is really needed you should be aware of
how the styles of components using different encapsulation modes will interact with each other...
