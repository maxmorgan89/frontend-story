```typescript

function map<T>(obj: T, iteratee: () => {}, context): T {
  var keys = !Array.isArray(obj) && Object.keys(obj),
      length = (keys || obj).length,
      results = Array(length);
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    results[index] = iteratee.call(context, obj[currentKey], currentKey, obj);
  }
  return results;
};
```
