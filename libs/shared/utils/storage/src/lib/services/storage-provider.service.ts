import { InjectionToken } from '@angular/core';


export const WindowToken = new InjectionToken<Window>('Window');
export function windowFactory() { return window; }

export const LocalStorage = new InjectionToken<Storage | null>('LocalStorage');
export const localStorageFactory = (win: Window) => getStorage(win, 'localStorage');

export const SessionStorage = new InjectionToken<Storage | null>('SessionStorage');
export const sessionStorageFactory = (win: Window) => getStorage(win, 'sessionStorage');

function getStorage(win: Window, storageType: 'localStorage' | 'sessionStorage'): Storage | null {
  // When cookies are disabled in the browser, even trying to access `window[storageType]` throws an error.
  try {
    return win[storageType];
  } catch {
    return null;
  }
}

type IterableObject = {
  [key: string]: unknown,
}

function mapObject<Item extends IterableObject>(inputObject: Item, iteratee: (objectItem: Item[keyof Item], objectKey: string, c: Item) => Item[keyof Item], context?: unknown): Item {
  const results: IterableObject = {} ;

  for (const key in Object.keys(inputObject)) {
    results[key] = iteratee.call(context, inputObject[key] as Item[keyof Item], key, inputObject);
  }

  return results as Item;
}

// function mapObject<Item extends IterableObject>(inputObject: Item, iteratee: (a: unknown, b: string, c: Item) => Item, context?: unknown): Item {
//   const results: IterableObject = {} ;
//
//   for (const key in Object.keys(inputObject)) {
//     results[key] = iteratee.call(context, inputObject[key], key, inputObject);
//   }
//
//   return results as Item;
// }


function mapArray<Item>(array: Item[], iteratee: (arrayItem: Item, index: number, array: Item[]) => Item, context?: unknown): Item[] {
  const results: Item[] = Array(array.length);

  for (let index = 0; index < array.length; index++) {
    results[index] = iteratee.call(context, array[index], index, array);
  }

  return results;
}

console.log(mapArray([3, '7'], (x) => Number.parseInt(x.toString()) + 5));
console.log(mapObject({a: 3, b: '7'}, (x) => Number.parseInt(x.toString()) + 5));
