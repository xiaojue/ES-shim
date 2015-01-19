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
  toString = Obj.prototype.toString.call,
  is = function(type) {
    return function(val) {
      return toString(val) === '[object ' + type + ']';
    };
  },
  isArr = is('Array'),
  isFun = is('Function'),
  isStr = is('String'),
  isReg = is('RegExp');

  var Arr5 = {
    isArray: isArr
  };

  var ArrPro5 = {
    //https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
    //http://es5.github.com/#x15.4.4.16
    every: function(fun, thisP) {
      var o = new Obj(this),
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
    filter: function() {

    },
    forEach: function() {},
    indexOf: function() {},
    lastIndexOf: function() {},
    map: function() {},
    some: function() {},
    reduce: function() {},
    reduceRight: function() {}
  };

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
        if (!forceAssign && (j in target)) continue;
        target[j] = source[j];
      }
    }
  }

  if (!supportES5) {
    extend([Arr5, Arr], [ArrPro5, AP], [StrPro5, SP], [D5, D], [DPro5, DP], [NumPro5, NP], [Obj5, Obj], [BPro5, BP], [Global5, global]);
  }

  if (!supportES6) {
    extend([Arr6, Arr], [ArrPro6, AP], [Str6, Str], [StrPro6, SP], [Num6, Num], [M6, M], [Obj6, Obj, true], [RegPro6, RP], [Global6, global, true]);
  }

})(window, document, Array, String, Date, Math, Number, Object, RegExp, Boolean, this);

