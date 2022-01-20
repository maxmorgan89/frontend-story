# Fundamental ProgrammingConcepts




##\* Difference between == and ===
Strict equality using ===

Strict equality compares two values for equality.
Neither value is implicitly converted to some other value before being compared.
If the values have different types, the values are considered unequal.
If the values have the same type, are not numbers, and have the same value, they're considered equal.
Finally, if both values are numbers,
they're considered equal if they're both not NaN and are the same value, or if one is `+0` and one is `-0`.

Loose equality using ==

Loose equality compares two values for equality after converting both values to a common type.
After conversions (one or both sides may undergo conversions),
the final equality comparison is performed exactly as === performs it.
`undefined` and `null` are loosely equal; that is, `undefined == null` is `true`

##\** What's the difference between an Object (JavaScript Object) and a Map?
##\** Describe steps of Breadth-First Search (or Depth-First Search) for graphs
##\*** Name Big-O complexities in growth order
##\*** Estimate Big-O complexity of coding task solution

