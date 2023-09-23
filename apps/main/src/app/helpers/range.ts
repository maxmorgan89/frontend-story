interface IRange<T> {
  from: number,
  to: number,
  [Symbol.iterator]: () => IRangeIterator<T>
}

interface IRangeIterator<T> extends Iterator<T>{
  current: number,
  last: number,
  next: () => IteratorResult<T>
}

export class Range implements IRange<number>{
  public readonly from: number;
  public readonly to: number;

  constructor(from: number, to: number) {
    this.from = from;
    this.to = to
  }

  [Symbol.iterator] = (): IRangeIterator<number> => {
    return ({
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true, value: this.current };
        }
      }
    })
  }
}

export function RangeFunctional(from: number, to: number): IRange<number> {
  return {
    from: from,
    to: to,
    [Symbol.iterator]() {
      return ({
        current: this.from,
        last: this.to,
        next() {
          if (this.current <= this.last) {
            return {done: false, value: this.current++};
          } else {
            return {done: true, value: this.current};
          }
        }
      })
    }
  }
}
