 export function zipW<F, S, R>(
    first: Array<F>,
    second: Array<S>,
    fn: (f: F, s: S) => R
  ): Array<R>;
  
  export function zipW<F, S, R>(
    fn: (f: F, s: S) => R
  ): (first: Array<F>, second: Array<S>) => Array<R>;
  
  export function zipW<F, S, R>(
    fn: (f: F, s: S) => R,
    second: Array<S>
  ): (first: Array<F>) => Array<R>;
  
  export function zipW() {
    const args = Array.from(arguments);
    if (typeof args[0] === 'function' && args.length === 1) {
      return function (f: any, s: any) {
        return _zipWith(f, s, args[0]);
      };
    }
  
    if (typeof args[0] === 'function' && args.length === 2) {
      return function (f: any) {
        return _zipWith(f, args[1], args[0]);
      };
    }
  
    if (args.length === 3) {
      return _zipWith(args[0], args[1], args[2]);
    }
  }
  
  function _zipWith<F, S, R>(
    first: Array<F>,
    second: Array<S>,
    fn: (f: F, s: S) => R
  ) {
    const resultLength =
      first.length > second.length ? second.length : first.length;
    const result: R[] = [];
    for (let i = 0; i < resultLength; i++) {
      result.push(fn(first[i], second[i]));
    }
  
    return result;
  }