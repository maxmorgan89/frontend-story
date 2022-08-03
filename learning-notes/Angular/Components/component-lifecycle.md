## [Lifecycle hooks](https://angular.io/guide/lifecycle-hooks)
A component instance has a lifecycle that starts when Angular instantiates the component class
and renders the component view along with its child views. The lifecycle continues with change
detection, as Angular checks to see when data-bound properties change, and updates both the view
and the component instance as needed. The lifecycle ends when Angular destroys the component
instance and removes its rendered template from the DOM. Directives have a similar lifecycle,
as Angular creates, updates, and destroys instances in the course of execution.

### Lifecycle event sequence
After your application instantiates a component or directive by calling its constructor,
Angular calls the hook methods you have implemented at the appropriate point in the lifecycle
of that instance.

Angular executes hook methods in the following sequence:

#### ngOnChanges()
###### _Purpose_
Respond when Angular sets or resets data-bound input properties. The method receives a `SimpleChanges`
object of current and previous property values.
> This happens very frequently, so any operation you perform here impacts performance significantly.
###### _Timing_
Called before `ngOnInit()` (if the component has bound inputs) and whenever one or more
data-bound input properties change.
> If your component has no inputs, or you use it without providing any inputs,
the framework will not call `ngOnChanges()`.

#### ngOnInit()
###### _Purpose_
Initialize the directive or component after Angular first displays the data-bound properties
and sets the directive or component's input properties.
###### _Timing_
Called once, after the first `ngOnChanges()`. `ngOnInit()` is still called even when `ngOnChanges()`
is not (which is the case when there are no template-bound inputs).

#### [ngDoCheck()](https://indepth.dev/posts/1131/if-you-think-ngdocheck-means-your-component-is-being-checked-read-this-article)
###### _Purpose_
Detect and act upon changes that Angular can't or won't detect on its own.
###### _Timing_
Called immediately after `ngOnChanges()` on every change detection run,
and immediately after `ngOnInit()` on the first run.

#### ngAfterContentInit()
###### _Purpose_
Respond after Angular projects external content into the component's view,
or into the view that a directive is in.
###### _Timing_
Called once after the first `ngDoCheck()`.

#### ngAfterContentChecked()
###### _Purpose_
Respond after Angular checks the content projected into the directive or component.
###### _Timing_
Called after `ngAfterContentInit()` and every subsequent `ngDoCheck()`.

#### ngAfterViewInit()
###### _Purpose_
Respond after Angular initializes the component's views and child views,
or the view that contains the directive.
###### _Timing_
Called once after the first `ngAfterContentChecked()`.

#### ngAfterViewChecked()
###### _Purpose_
Respond after Angular checks the component's views and child views,
or the view that contains the directive.
###### _Timing_
Called after the `ngAfterViewInit()` and every subsequent `ngAfterContentChecked()`.

#### ngOnDestroy()
###### _Purpose_
Cleanup just before Angular destroys the directive or component. Unsubscribe Observables
and detach event handlers to avoid memory leaks.
###### _Timing_
Called immediately before Angular destroys the directive or component.
