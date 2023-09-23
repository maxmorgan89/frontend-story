## Dependency providers

By configuring providers, you can make services available to the parts of your application
that need them.

A dependency provider configures an injector with a DI token, which that injector uses
to provide the runtime version of a dependency value.

### Specifying a provider token

If you specify the service class as the provider token, the default behavior is for the injector
to instantiate that class with new.

```typescript
providers: [Logger]
```

You can, however, configure an injector with an alternative provider to deliver some other
object that provides the needed logging functionality.

Configure an injector with a service class, and provide a substitute class, an object, or
a factory function.

### Dependency injection tokens

When you configure an injector with a provider, you are associating that provider with a
dependency injection token, or DI token. The injector lets Angular create a map of any
internal dependencies. The DI token acts as a key to that map.

The dependency value is an instance, and the class type serves as a lookup key. Here,
the injector uses the `HeroService` type as the token for looking up `heroService`.

```typescript
heroService: HeroService;
```

### Defining providers

The class provider syntax is a shorthand expression that expands into a provider configuration,
defined by the `Provider` interface. 

```typescript
providers: [Logger]
// Angular expands the providers value into a full provider object as follows.
[{ provide: Logger, useClass: Logger }]
```

The expanded provider configuration is an object literal with two properties:

- The `provide` property holds the token that serves as the key for both locating a dependency 
value and configuring the injector.
- The second property is a provider definition object, which tells the injector how to create
the dependency value. The provider-definition key can be `useClass`, as in the example.
It can also be `useExisting`, `useValue`, or `useFactory`.

### Specifying an alternative class provider

Different classes can provide the same service. For example, the following code tells the
injector to return a BetterLogger instance when the component asks for a logger using
the Logger token.

```typescript
[{ provide: Logger, useClass: BetterLogger }]
```

##### Configuring class providers with dependencies

If the alternative class providers have their own dependencies, specify both providers in
the providers metadata property of the parent module or component.

```typescript
[ UserService,
{ provide: Logger, useClass: EvenBetterLogger }]
```

In this example, `EvenBetterLogger` displays the username in the log message. This logger
gets the user from an injected `UserService` instance.

```typescript
@Injectable()
export class EvenBetterLogger extends Logger {
    constructor(private userService: UserService) { super(); }
}
```

The injector needs providers for both this new logging service and its dependent `UserService`.

##### Aliasing class providers

To alias a class provider, specify the alias and the class provider in the providers array
with the `useExisting` property.

In the following example, the injector injects the singleton instance of `NewLogger` when
the component asks for either the new or the old logger. In this way, `OldLogger` is an
alias for `NewLogger`.

```typescript
[ NewLogger,
// Alias OldLogger with reference to NewLogger
{ provide: OldLogger, useExisting: NewLogger}]
```

Be sure you don't alias `OldLogger` to `NewLogger` with `useClass`, as this creates two
different `NewLogger` instances.

### Aliasing a class interface

Generally, writing variations of the same parent alias provider uses forwardRef as follows.

```typescript
providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],
```

To streamline your code, extract that logic into a helper function using the provideParent() helper function.

```typescript
// Helper method to provide the current component instance in the name of a `parentType`.
export function provideParent(component: any) {
    return { provide: Parent, useExisting: forwardRef(() => component) };
}
```

Now you can add a parent provider to your components that's easier to read and understand.

```typescript
providers:  [ provideParent(AliceComponent) ]
```

##### Aliasing multiple class interfaces

To alias multiple parent types, each with its own class interface token, configure
`provideParent()` to accept more arguments.

Here's a revised version that defaults to parent but also accepts an optional second
parameter for a different parent class interface.

```typescript
// Helper method to provide the current component instance in the name of a `parentType`.
// The `parentType` defaults to `Parent` when omitting the second parameter.
export function provideParent(component: any, parentType?: any) {
    return { provide: parentType || Parent, useExisting: forwardRef(() => component) };
}
```

Next, to use `provideParent()` with a different parent type, provide a second argument, here
`DifferentParent`.

```typescript
providers:  [ provideParent(BethComponent, DifferentParent) ]
```

### Injecting an object





















