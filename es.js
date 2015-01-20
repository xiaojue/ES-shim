/**
 * @author xiaojue [designsor@gmail.com]
 * @fileoverview ES5-6 shim for client javascript
 */
(function(win, doc, Arr, Str, D, M, Num, Obj, Reg, B, global, undef) {

  var AP = Arr.prototype,
  SP = Str.prototype,
  DP = D.prototype,
  NP = Num.prototype,
  BP = B.prototype,
  RP = Reg.prototype,
  toString = Obj.prototype.toString,
  is = function(type) {
    return function(val) {
      return toString.call(val) === '[object ' + type + ']';
    };
  },
  isArr = is('Array'),
  isFun = is('Function'),
  isStr = is('String'),
  isReg = is('RegExp');

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
  function toInteger(num) {
    var n = Num(num);
    if (n != num || n === Infinity) { //isNaN,expect string
      n = 0;
    } else if (n !== 0 && n != (1 / 0) && n != - (1 / 0)) {
      n = (n > 0 || - 1) * M.floor(M.abs(n));
    }
    return n;
  }

  var Arr5 = {
    isArray: isArr
  };

  //http://es5.github.com/#x15.4.4.16
  var ArrPro5 = {
    //https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
    every: function(fun, thisP) {
      var O = Obj(this),
      len = O.length >>> 0,
      k = 0;
      if (!isFun(fun)) throw new TypeError(fun + ' is not a function');
      while (k < len) {
        if (k in O) {
          if (!fun.call(thisP, O[k], k, O)) return false;
        }
        k++;
      }
      return true;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    filter: function(fun, thisP) {
      var O = Obj(this),
      len = O.length >>> 0,
      res = [];
      if (!isFun(fun)) throw new TypeError(fun + ' is not a function');
      for (var i = 0; i < len; i++) {
        if (i in O) {
          var value = O[i];
          if (fun.call(thisP, value, i, O)) res.push(value);
        }
      }
      return res;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    forEach: function(fun, thisP) {
      var O = Obj(this),
      len = O.length >>> 0,
      k = 0;
      if (!isFun(fun)) throw new TypeError(fun + ' is not a function');
      while (k < len) {
        if (k in O) {
          fun.call(thisP, O[k], k, O);
        }
        k++;
      }
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    indexOf: function(searchElement, fromIndex) {
      var O = Obj(this),
      k,
      len = O.length >>> 0,
      n = toInteger(fromIndex);
      if (len === 0 || n >= len) return - 1;
      k = M.max(n >= 0 ? n: len - M.abs(n), 0);
      while (k < len) {
        if (k in O && O[k] === searchElement) return k;
        k++;
      }
      return - 1;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
    lastIndexOf: function(searchElement, fromIndex) {
      var O = Obj(this),
      k,
      n,
      len = O.length >>> 0;
      if (len === 0) return - 1;
      n = len - 1;
      if (arguments.length > 1) {
        n = toInteger(fromIndex);
      }
      for (k = n >= 0 ? M.min(n, len - 1) : len - M.abs(n); k >= 0; k--) {
        if (k in O && O[k] === searchElement) return k;
      }
      return - 1;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    map: function(fun, thisP) {
      var O = Obj(this),
      len = O.length >>> 0,
      t,
      arr = new Arr(len),
      k = 0;
      if (!isFun(fun)) throw new TypeError(fun + ' is not a function');
      while (k < len) {
        if (k in O) {
          arr[k] = fun.call(thisP, O[k], k, O);
        }
        k++;
      }
      return arr;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    some: function(fun, thisP) {
      var O = Obj(this),
      len = O.length >>> 0;
      if (!isFun(fun)) throw new TypeError(fun + ' is not a function');
      for (var i = 0; i < len; i++) {
        if (i in O && fun.call(thisP, O[i], i, O)) return true;
      }
      return false;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    reduce: function(fun, initialValue) {
      var O = Obj(this);
      return reduce(O, fun, initialValue, 'left');
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
    reduceRight: function(fun, initialValue) {
      var O = Obj(this);
      return reduce(O, fun, initialValue, 'right');
    }
  };

  function reduce(source, fun, initialValue, type) {
    var len = source.length >>> 0,
    isLeft = type === 'left',
    k = isLeft ? 0: len - 1,
    t,
    index,
    express,
    value;
    if (!isFun(fun)) throw new TypeError(fun + ' is not a function');
    if (initialValue) {
      value = initialValue;
    } else {
      do {
        if (k in source) {
          value = source[k];
          k += (!!isLeft || -1);
          break;
        }
        index = isLeft ? k + 1: k - 1;
        express = isLeft ? index >= len: index < 0;
        if (express) throw new TypeError('Reduce of empty array with no initial value');
      } while (true);
    }
    while (isLeft ? k < len: k >= 0) {
      if (k in source) value = fun.call(undefined, value, source[k], k, source);
      k += (!!isLeft || -1);
    }
    return value;
  }

  var Arr6 = {
    from: function() {},
    of: function() {}
  };

  var ArrPro6 = {
    copyWithin: function() {},
    fill: function() {},
    find: function() {},
    findIndex: function() {},
    keys: function() {},
    entries: function() {},
    values: function() {}
  };

  var StrPro5 = {
    split: function() {},
    trim: function() {},
    replace: function() {}
  };

  var Str6 = {
    fromCodePoint: function() {},
    raw: function() {}
  };

  var StrPro6 = {
    normalize: function() {},
    codePointAt: function() {},
    repeat: function() {},
    startsWith: function() {},
    endsWith: function() {},
    includes: function() {}
  };

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  function pad(number) {
    if (number < 10) return '0' + number;
    return number;
  }

  var D5 = {
    now: function() {
      return new D().getTime();
    },
    toISOString: function() {
      return this.getUTCFullYear() + '-' + pad(this.getUTCMonth() + 1) + '-' + pad(this.getUTCDate()) + 'T' + pad(this.getUTCHours()) + ':' + pad(this.getUTCMinutes()) + ':' + pad(this.getUTCSeconds()) + '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
    }
  };

  var DPro5 = {
    parse: function() {},
    toJSON: function() {}
  };

  var M6 = {
    acosh: function() {},
    asinh: function() {},
    atanh: function() {},
    cbrt: function() {},
    clz32: function() {},
    cosh: function() {},
    expm1: function() {},
    hypot: function() {},
    log2: function() {},
    log10: function() {},
    log1p: function() {},
    sign: function() {},
    sinh: function() {},
    tanh: function() {},
    trunc: function() {},
    imul: function() {},
    fround: function() {}
  };

  var NumPro5 = {
    toJSON: function() {},
    toFixed: function() {}
  };

  var Num6 = {
    MAX_SAFE_INTEGER: '',
    MIN_SAFE_INTEGER: '',
    EPSILON: '',
    parseInt: function() {},
    parseFloat: function() {},
    isNaN: function() {},
    isInteger: function() {},
    isSafeInteger: function() {},
    isFinite: function() {}
  };

  var BPro5 = {
    toJSON: function() {}
  };

  var Obj5 = {
    keys: function() {},
    create: function() {},
    getPrototypeOf: function() {},
    getOwnPropertyNames: function() {},
    defineProperty: function() {},
    getOwnPropertDescriptor: function() {}
  };

  var Obj6 = {
    keys: function() {},
    is: function() {},
    assign: function() {},
    setPrototypeOf: function() {}
  };

  var RegPro6 = {
    flags: function() {}
  };

  var Global5 = {
    parseInt: function() {},
    JSON: {
      parse: function() {},
      stringify: function() {}
    }
  };

  var Global6 = {
    Promise: function() {},
    Map: function() {},
    Set: function() {}
  };

  var supportES5 = checkES(Global5, global) && checkES(ArrPro5, AP),
  supportES6 = checkES(Global6, global) && checkES(ArrPro6, AP);

  function checkES(features, target) {
    for (var feature in features) {
      if (!target.hasOwnProperty(feature)) return false;
    }
    return true;
  }

  function extend() {
    var args = arguments;
    for (var i = 0; i < args.length; i++) {
      var exts = args[i],
      source = exts[0],
      target = exts[1],
      forceAssign = exts[3];
      for (var j in source) {
        //if (!forceAssign && (j in target)) continue;
        target[j] = source[j];
      }
    }
  }

  //if (!supportES5) {
  console.log(5);
  extend([Arr5, Arr], [ArrPro5, AP], [StrPro5, SP], [D5, D], [DPro5, DP], [NumPro5, NP], [Obj5, Obj], [BPro5, BP], [Global5, global]);
  //}
  if (!supportES6) {
    console.log(6);
    extend([Arr6, Arr], [ArrPro6, AP], [Str6, Str], [StrPro6, SP], [Num6, Num], [M6, M], [Obj6, Obj, true], [RegPro6, RP], [Global6, global, true]);
  }

})(window, document, Array, String, Date, Math, Number, Object, RegExp, Boolean, this);

