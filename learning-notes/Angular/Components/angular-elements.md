## [Angular elements](https://angular.io/guide/elements)
Angular elements are Angular components packaged as custom elements (also called Web Components),
a web standard for defining new HTML elements in a framework-agnostic way.

Angular Elements is a new package in Angular that helps us publish Angular components as custom  
elements. It does this by taking the Angular component and compiling it into a web component.

### [Why Angular Elements?](https://blog.nrwl.io/5-reasons-to-use-angular-elements-390c9a629f89)

1. Embedding Angular Components Into Non-Angular Applications
All framework speak “custom elements”, at least to some degree. So if you want to embed an Angular
component into your React, Vue, or Ember app, just wrap it into a custom element. Having said that,
we at Nrwl recommend you to avoid mixing frameworks unless you have a very good reason to.

2. Embedding Angular Components Into Content Sites
If you have a server-side (e.g. ASP.net) application you want to sprinkle with some Angular magic,
Angular Elements are the easiest way to do it.

3. Implementing Dynamic Angular Applications (“Dashboard”/CMS)
Seemingly every other application we look at contains a requirement for some kind of dynamic
dashboard. Usually such a dashboard has to be assembled from a fixed set of Angular components
using some metadata. This has to happen at runtime, so we cannot precompile an assembled dashboard.

4. Upgrading from AngularJS to Angular

5. Independent Deployment. If your organization wants to develop and publish parts of an 
   application independently, elements are a great way to achieve that.

