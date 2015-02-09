(function(global, M, Num) {

  var $ES = global.$ES;
  if ($ES) {
    //ES6
    //http://baike.baidu.com/link?url=FVj1cXvzfX11Gnf-0kPD4AAVXZh6l631NaKvU_lGW7tHTjk9JqZqRH0io4to_bna7NLczhfHcbMG0l8b88jW5a 双曲线百科
    //http://baike.baidu.com/view/6688537.htm 反双曲线百科
    $ES.defineProperties(M, {
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
        return M.log((1 + x) / (1 - x)) / 2;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt
      //cbrt 函数返回 x 的立方根值。这个函数不会失败；任何可表示的实数总有一个可表示的立方根。
      cbrt: function(x) {
        var y = M.pow(M.abs(x), 1 / 3);
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
        var y = M.exp(x);
        return (y + 1 / y) / 2;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1
      //expm1 计算参数的以 e 为底的指数，减去 1
      expm1: function(x) {
        return M.exp(x) - 1;
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
        return M.log(1 + x);
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
      imul: imul,
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
      //fround 将参数中指定的数字转换为离它最近的单精度浮点数形式.
      fround: function(x) {
        if (x === 0 || x === Infinity || x === - Infinity || isNaN(x)) return x;
        return toFloat32(Num(x));
      }

    },
    ! M.acosh);

    // from https://github.com/inexorabletash/polyfill/blob/master/typedarray.js#L176-L266
    function roundToEven(n) {
      var w = M.floor(n),
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
        f = M.pow(2, fbits - 1);
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
        v = M.abs(v);

        if (v >= M.pow(2, 1 - bias)) {
          e = M.min(M.floor(M.log(v) / M.LN2), 1023);
          f = roundToEven(v / M.pow(2, e) * M.pow(2, fbits));
          if (f / M.pow(2, fbits) >= 2) {
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
            f = f - M.pow(2, fbits);
          }
        } else {
          // Subnormal
          e = 0;
          f = roundToEven(v / M.pow(2, 1 - bias - fbits));
        }
      }

      // Pack sign, exponent, fraction
      bits = [];
      for (i = fbits; i; i -= 1) {
        bits.push(f % 2 ? 1: 0);
        f = M.floor(f / 2);
      }
      for (i = ebits; i; i -= 1) {
        bits.push(e % 2 ? 1: 0);
        e = M.floor(e / 2);
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
        return s * M.pow(2, e - bias) * (1 + f / M.pow(2, fbits));
      } else if (f !== 0) {
        // Denormalized
        return s * M.pow(2, - (bias - 1)) * (f / M.pow(2, fbits));
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

    //bugs
    $ES.defineProperty(M, 'round', function(x) {
      if ( - 0.5 <= x && x < 0.5 && x !== 0) {
        return M.sign(x * 0);
      }
      return M.round(x);
    },
    M.round(0.5 - Num.EPSILON / 4) === 0 && M.round( - 0.5 + Num.EPSILON / 3.99) === 1);

    function imul(a, b) {
      var ah = (a >>> 16) & 0xffff;
      var al = a & 0xffff;
      var bh = (b >>> 16) & 0xffff;
      var bl = b & 0xffff;
      return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
    }

    $ES.defineProperty(M, 'imul', imul, M.imul(0xffffffff, 5) !== - 5);

  }

})(this, Math, Number);

