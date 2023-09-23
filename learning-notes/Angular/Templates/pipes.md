## Pipes

Pipes are simple functions to use in template expressions to accept an input value and return
a transformed value.

### Pipe Decorator Options

###### name: string

The pipe name to use in template bindings. Typically uses lowerCamelCase because the name
cannot contain hyphens.

###### pure?: boolean

When true, the pipe is pure, meaning that the `transform()` method is invoked only when its input
arguments change. Pipes are pure by default.

If the pipe has internal state (that is, the result depends on state other than its arguments),
set `pure` to false. In this case, the pipe is invoked on each change-detection cycle,
even if the arguments have not changed.

###### standalone?: boolean

Angular pipes marked as standalone do not need to be declared in an NgModule. Such pipes
don't depend on any "intermediate context" of an NgModule (ex. configured providers).

### Built-in pipes

Angular provides built-in pipes for typical data transformations, including transformations
for internationalization (i18n), which use locale information to format data.

###### AsyncPipe

Unwraps a value from an asynchronous primitive.

###### CurrencyPipe

Transforms a number to a currency string, formatted according to locale rules that determine
group sizing and separator, decimal-point character, and other locale-specific configurations.

###### DatePipe

Formats a date value according to locale rules.

###### DecimalPipe

Formats a value according to digit options and locale rules. Locale determines group sizing
and separator, decimal point character, and other locale-specific configurations.

###### I18nPluralPipe

Maps a value to a string that pluralizes the value according to locale rules.

###### I18nSelectPipe

Generic selector that displays the string that matches the current value.

###### JsonPipe

Converts a value into its JSON-format representation. Useful for debugging.

###### KeyValuePipe

Transforms Object or Map into an array of key value pairs.

###### LowerCasePipe

Transforms text to all lower case.

###### PercentPipe

Transforms a number to a percentage string, formatted according to locale rules that determine
group sizing and separator, decimal-point character, and other locale-specific configurations.

###### SlicePipe

Creates a new Array or String containing a subset (slice) of the elements.

###### TitleCasePipe

Transforms text to title case. Capitalizes the first letter of each word and transforms the rest
of the word to lower case. Words are delimited by any whitespace character, such as a space,
tab, or line-feed character.

###### UpperCasePipe

Transforms text to all upper case.
