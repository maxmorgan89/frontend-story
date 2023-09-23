## [Core Concepts](https://www.howtographql.com/basics/2-core-concepts/)

### The Schema Definition Language (SDL)

GraphQL has its own type system that’s used to define the schema of an API. The syntax for 
writing schemas is called Schema Definition Language (SDL).

Here is an example of how we can use the SDL to define a simple type called `Person`:

```graphql
type Person {
  name: String!
  age: Int!
}
```













