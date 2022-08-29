function _type(val: any) {
    return val === null
      ? 'Null'
      : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1);
  }

function _cloneRegExp(pattern: RegExp) {
  return new RegExp(
    pattern.source,
    (pattern.global ? 'g' : '') +
      (pattern.ignoreCase ? 'i' : '') +
      (pattern.multiline ? 'm' : '') +
      (pattern.sticky ? 'y' : '') +
      (pattern.unicode ? 'u' : '')
  );
}

function _clone(value: any, refFrom: any[], refTo: any[], deep: boolean) {
  function copy(copiedValue: any) {
    const len = refFrom.length;
    let idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    // tslint:disable-next-line:forin
    for (const key in value) {
      copiedValue[key] = deep
        ? _clone(value[key], refFrom, refTo, true)
        : value[key];
    }
    return copiedValue;
  }
  switch (_type(value)) {
    case 'Object':
      return copy({});
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return _cloneRegExp(value);
    default:
      return value;
  }
}

export function clone<T extends any>(value: T): T {
  return value != null && typeof (value as any).clone === 'function'
    ? (value as any).clone()
    : _clone(value, [], [], true);
}