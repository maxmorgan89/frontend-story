### [Typed Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
JavaScript typed arrays are array-like objects that provide a mechanism for reading and writing
raw binary data in memory buffers.

As web applications become more and more powerful, adding features such as audio and video manipulation,
access to raw data using WebSockets, and so forth, it has become clear that there are times when
it would be helpful for JavaScript code to be able to quickly and easily manipulate raw binary data.
This is where typed arrays come in. Each entry in a JavaScript typed array is a raw binary
value in one of a number of supported formats, from 8-bit integers to 64-bit floating-point numbers.

However, typed arrays are not to be confused with normal arrays, as calling `Array.isArray()`
on a typed array returns `false`. Moreover, not all methods available for normal arrays
are supported by typed arrays (e.g. push and pop).

