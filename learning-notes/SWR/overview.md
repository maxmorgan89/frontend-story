## [SWR](https://swr.vercel.app/docs/getting-started)

The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy 
popularized by HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), 
then send the fetch request (revalidate), and finally come with the up-to-date data.

> With SWR, components will get a stream of data updates constantly and automatically.
And the UI will be always fast and reactive.

```typescript jsx
import useSWR from 'swr'

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

In this example, the `useSWR` hook accepts a `key` string and a `fetcher` function. `key` is a 
unique identifier of the data (normally the API URL) and will be passed to `fetcher`. `fetcher` 
can be any asynchronous function which returns the data, you can use the native fetch or tools 
like Axios.

The hook returns 2 values: data and error, based on the status of the request.

### Features

With just one single line of code, you can simplify the logic of data fetching in your project, 
and also have all these amazing features out-of-the-box:

- Fast, lightweight and reusable data fetching
- Built-in cache and request deduplication
- Real-time experience
- Transport and protocol agnostic
- SSR / ISR / SSG support
- TypeScript ready
- React Native

SWR has you covered in all aspects of speed, correctness, and stability to help you build 
better experiences:

- Fast page navigation
- Polling on interval
- Data dependency
- Revalidation on focus
- Revalidation on network recovery
- Local mutation (Optimistic UI)
- Smart error retry
- Pagination and scroll position recovery
- React Suspense

### Installation

```shell
yarn add swr
npm install swr
```

### Make It Reusable
When building a web app, you might need to reuse the data in many places of the UI. It is 
incredibly easy to create reusable data hooks on top of SWR:

```typescript jsx
function useUser (id) {
    const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)

    return {
        user: data,
        isLoading,
        isError: error
    }
}
```

And use it in your components:

```typescript jsx
function Avatar ({ id }) {
  const { user, isLoading, isError } = useUser(id)

  if (isLoading) return <Spinner />
  if (isError) return <Error />
  return <img src={user.avatar} />
}
```

By adopting this pattern, you can forget about fetching data in the imperative way: start the 
request, update the loading state, and return the final result. Instead, your code is more 
declarative: you just need to specify what data is used by the component.











