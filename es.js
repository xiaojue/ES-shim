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
          k += ( !! isLeft || - 1);
          break;
        }
        index = isLeft ? k + 1: k - 1;
        express = isLeft ? index >= len: index < 0;
        if (express) throw new TypeError('Reduce of empty array with no initial value');
      } while (true);
    }
    while (isLeft ? k < len: k >= 0) {
      if (k in source) value = fun.call(undefined, value, source[k], k, source);
      k += ( !! isLeft || - 1);
    }
    return value;
  }

  var Arr6 = {
    from: function() {

    },
    of: function() {

    }
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
  // from https://github.com/inexorabletash/polyfill/blob/master/typedarray.js#L176-L266
  function roundToEven(n) {
    var w = Math.floor(n),
    f = n - w;
    if (f < 0.5) {
      return w;
    }
    if (f > 0.5) {
      return w + 1;
    }
    return w % 2 ? w + 1: w;
  }

  function packIEEE754(v, ebits, fbits) {
    var bias = (1 << (ebits - 1)) - 1,
    s,
    e,
    f,
    i,
    bits,
    str,
    bytes;

    // Compute sign, exponent, fraction
    var num = Num(v);
    if (v != num) {
      // NaN
      // http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
      e = (1 << ebits) - 1;
      f = Math.pow(2, fbits - 1);
      s = 0;
    } else if (v === Infinity || v === - Infinity) {
      e = (1 << ebits) - 1;
      f = 0;
      s = (v < 0) ? 1: 0;
    } else if (v === 0) {
      e = 0;
      f = 0;
      s = (1 / v === - Infinity) ? 1: 0;
    } else {
      s = v < 0;
      v = Math.abs(v);

      if (v >= Math.pow(2, 1 - bias)) {
        e = Math.min(Math.floor(Math.log(v) / Math.LN2), 1023);
        f = roundToEven(v / Math.pow(2, e) * Math.pow(2, fbits));
        if (f / Math.pow(2, fbits) >= 2) {
          e = e + 1;
          f = 1;
        }
        if (e > bias) {
          // Overflow
          e = (1 << ebits) - 1;
          f = 0;
        } else {
          // Normal
          e = e + bias;
          f = f - Math.pow(2, fbits);
        }
      } else {
        // Subnormal
        e = 0;
        f = roundToEven(v / Math.pow(2, 1 - bias - fbits));
      }
    }

    // Pack sign, exponent, fraction
    bits = [];
    for (i = fbits; i; i -= 1) {
      bits.push(f % 2 ? 1: 0);
      f = Math.floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
      bits.push(e % 2 ? 1: 0);
      e = Math.floor(e / 2);
    }
    bits.push(s ? 1: 0);
    bits.reverse();
    str = bits.join('');

    // Bits to bytes
    bytes = [];
    while (str.length) {
      bytes.push(parseInt(str.slice(0, 8), 2));
      str = str.slice(8);
    }
    return bytes;
  }

  function unpackIEEE754(bytes, ebits, fbits) {
    // Bytes to bits
    var bits = [],
    i,
    j,
    b,
    str,
    bias,
    s,
    e,
    f;

    for (i = bytes.length; i; i -= 1) {
      b = bytes[i - 1];
      for (j = 8; j; j -= 1) {
        bits.push(b % 2 ? 1: 0);
        b = b >> 1;
      }
    }
    bits.reverse();
    str = bits.join('');

    // Unpack sign, exponent, fraction
    bias = (1 << (ebits - 1)) - 1;
    s = parseInt(str.slice(0, 1), 2) ? - 1: 1;
    e = parseInt(str.slice(1, 1 + ebits), 2);
    f = parseInt(str.slice(1 + ebits), 2);

    // Produce number
    if (e === (1 << ebits) - 1) {
      return f !== 0 ? NaN: s * Infinity;
    } else if (e > 0) {
      // Normalized
      return s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
    } else if (f !== 0) {
      // Denormalized
      return s * Math.pow(2, - (bias - 1)) * (f / Math.pow(2, fbits));
    } else {
      return s < 0 ? - 0: 0;
    }
  }

  function unpackFloat32(b) {
    return unpackIEEE754(b, 8, 23);
  }
  function packFloat32(v) {
    return packIEEE754(v, 8, 23);
  }
  function toFloat32(num) {
    return unpackFloat32(packFloat32(num));
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


  //http://baike.baidu.com/link?url=FVj1cXvzfX11Gnf-0kPD4AAVXZh6l631NaKvU_lGW7tHTjk9JqZqRH0io4to_bna7NLczhfHcbMG0l8b88jW5a 双曲线百科
  //http://baike.baidu.com/view/6688537.htm 反双曲线百科
  var M6 = {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh
    //acosh 函数返回一个数的反双曲余弦。
    acosh: function(x) {
      return M.log(x + M.sqrt(x * x - 1));
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh
    //asinh 函数返回参数的反双曲正弦值
    asinh: function(x) {
      if (x === - Infinity) return x;
      else return M.log(x + M.sqrt(x * x + 1));
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh
    //atanh 返回参数的反双曲正切值
    atanh: function(x) {
      return Math.log((1 + x) / (1 - x)) / 2;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt
    //cbrt 函数返回 x 的立方根值。这个函数不会失败；任何可表示的实数总有一个可表示的立方根。
    cbrt: function(x) {
      var y = Math.pow(Math.abs(x), 1 / 3);
      return x < 0 ? - y: y;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
    //CountLeadingZeroes32 计算一个数字在32位无符号位整形数字的二进制形式开头有多少个0。
    clz32: function(x) {
      var value = Number(x) >>> 0;
      return value ? 32 - value.toString(2).length: 32;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh
    //cosh 返回数字的双曲余弦值。
    cosh: function(x) {
      var y = Math.exp(x);
      return (y + 1 / y) / 2;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1
    //expm1 计算参数的以 e 为底的指数，减去 1
    expm1: function(x) {
      return Math.exp(x) - 1;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
    //hypot 函数计算一直角三角形的斜边长度。
    hypot: function(x, y) {
      var r = 0;
      if (M.abs(x) === Infinity || M.abs(y) === Infinity) return Infinity;
      r += x * y;
      return M.sqrt(y);
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2
    //log2 计算参数以 2 为底的对数
    log2: function(x) {
      return M.log(x) / M.LN2;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
    //log10 计算参数以 10 为底的对数
    log10: function(x) {
      return M.log(x) / M.LN10;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p
    //log1p 计算参数加1的对数值
    log1p: function(x) {
      return Math.log(1 + x);
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
    //sign 判断一个数的符号位
    sign: function(x) {
      x = + x; // convert to a number
      if (x === 0 || isNaN(x)) return x;
      return x > 0 ? 1: - 1;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh
    //sinh 双曲正弦函数
    sinh: function(x) {
      var y = M.exp(x);
      return (y - 1 / y) / 2;
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh
    //tanh 双曲线正切函数
    tanh: function(x) {
      if (x === Infinity) {
        return 1;
      } else if (x === - Infinity) {
        return - 1;
      } else {
        var y = M.exp(2 * x);
        return (y - 1) / (y + 1);
      }
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
    //trunc 取整函数
    trunc: function(x) {
      return x < 0 ? M.ceil(x) : M.floor(x);
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
    //imul 该函数返回两个参数的类C的32位整数乘法运算的运算结果.
    imul: function(a, b) {
      var ah = (a >>> 16) & 0xffff;
      var al = a & 0xffff;
      var bh = (b >>> 16) & 0xffff;
      var bl = b & 0xffff;
      return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
    },
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
    //fround 将参数中指定的数字转换为离它最近的单精度浮点数形式.
    fround: function(x) {
      if (x === 0 || x === Infinity || x === - Infinity || isNaN(x)) return x;
      return toFloat32(Num(x));
    }
  };

  var M5 = {
    //https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L1279
    round:function(x){
      if(-0.5 <= x && x < 0.5 && x !== 0){
        return M6.sign(x * 0); 
      } 
      return M.round(x);
    } 
  };

  var NumPro5 = {
    toJSON: function() {},
    toFixed: function(fractionDigits) {
      //https://bugzilla.mozilla.org/show_bug.cgi?id=186563#c5
      //http://hushc.sinaapp.com/post/90.html
      var num = Num(this);
      return (M.round(num * M.pow(10, fractionDigits)) / M.pow(10, fractionDigits) + M.pow(10, -(fractionDigits + 1))).toString().slice(0, -1);
    }
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

  if (!supportES5) {
    console.log(5);
    extend([Arr5, Arr], [ArrPro5, AP], [StrPro5, SP], [D5, D], [DPro5, DP], [NumPro5, NP], [Obj5, Obj], [BPro5, BP], [Global5, global]);
  }
  if (!supportES6) {
    console.log(6);
    extend([Arr6, Arr], [ArrPro6, AP], [Str6, Str], [StrPro6, SP], [Num6, Num], [M6, M], [Obj6, Obj, true], [RegPro6, RP], [Global6, global, true]);
  }

  if (M.imul(0xffffffff, 5) !== - 5) {
    // Safari 6.1, at least, reports "0" for this value
    M.imul = M6.imul;
  }

  if(M.round(0.5 - Num.EPSILON / 4) === 0 && M.round(-0.5 + Num.EPSILON/3.99) === 1){
    //http://stackoverflow.com/questions/12830742/javascript-math-round-bug-in-ie
    M.round = M5.round;
  }

})(window, document, Array, String, Date, Math, Number, Object, RegExp, Boolean, this);

