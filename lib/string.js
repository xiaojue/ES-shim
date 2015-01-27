(function(global, Str, M,undef) {
  var $ES = global.$ES;

  if ($ES) {

    var SP = Str.prototype,
    //https://github.com/es-shims/es5-shim/blob/master/es5-shim.js#L1398
    ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF',
    wsRegexChars = '[' + ws + ']',
    trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*'),
    trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');

    //ES5
    $ES.defineProperty(SP, 'toJSON', $ES._toJSON, ! SP.toJSON);

    $ES.defineProperty(SP, 'trim', function() {
      if (!isStr(this) || this === null) throw new TypeError('can\'t convert to ' + this + ' object');
      return Str(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
    },
    ! SP.trim);

    function ToObject(o,optMessage){
      if (o === null) throw new TypeError(optMessage || 'Cannot call method on ' + o);
      return Obj(o);
    }

    function SameValue(a, b) {
      if (a === b) {
        // 0 === -0, but they are not identical.
        if (a === 0) return 1 / a === 1 / b;
        return true;
      }
      return isNaN(a) && isNaN(b);
    }

    //ES6
    $ES.defineProperties(Str, {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
      fromCodePoint: function(codePoints) {
        var result = [],
        next;
        for (var i = 0, length = arguments.length; i < length; i++) {
          next = Num(arguments[i]);
          if (SameValue(next, $ES.toInteger(next)) || next < 0 || next > 0x10FFFF) {
            throw new Error('Invalid code point ' + next);
          }
          if (next < 0x10000) {
            result.push(Str.fromCharCode(next));
          } else {
            next -= 0x10000;
            result.push(Str.fromCharCode((next >> 10) + 0xD800));
            result.push(Str.fromCharCode((next % 0x400) + 0xDC00));
          }
        }
        return result.join('');
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw
      raw: function(callSite) {
        var cooked = ToObject(callSite, 'bad callSite'),
        rawValue = cooked.raw,
        rawString = ToObject(rawValue, 'bad raw value'),
        len = rawString.length,
        literalsegments = $ES.toLength(len);
        if (literalsegments <= 0) {
          return '';
        }

        var stringElements = [];
        var nextIndex = 0;
        var nextKey, next, nextSeg, nextSub;
        while (nextIndex < literalsegments) {
          nextKey = Str(nextIndex);
          next = rawString[nextKey];
          nextSeg = Str(next);
          stringElements.push(nextSeg);
          if (nextIndex + 1 >= literalsegments) {
            break;
          }
          next = nextIndex + 1 < arguments.length ? arguments[nextIndex + 1] : '';
          nextSub = Str(next);
          stringElements.push(nextSub);
          nextIndex++;
        }
        return stringElements.join('');
      }
    },
    ! Str.raw);

    $ES.defineProperties(SP, {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
      normalize: function() {
        //TODO
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
      codePointAt: function(pos) {
        if (!$ES.isStr(this) || this === null) throw new TypeError('can\'t convert to ' + this + ' object');
        var thisStr = Str(this),
        position = $ES.toInteger(pos),
        length = thisStr.length;
        if (position >= 0 && position < length) {
          var first = thisStr.charCodeAt(position);
          var isEnd = (position + 1 === length);
          if (first < 0xD800 || first > 0xDBFF || isEnd) return first;
          var second = thisStr.charCodeAt(position + 1);
          if (second < 0xDC00 || second > 0xDFFF) return first;
          return ((first - 0xD800) * 1024) + (second - 0xDC00) + 0x10000;
        }
        return undef;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
      repeat: function(count) {
        if (!$ES.isStr(this) || this === null) throw new TypeError('can\'t convert to ' + this + ' object');
        var str = Str(this);
        count = $ES.toInteger(count);
        if (count < 0 || count == Infinity) throw new Error('repeat count must be non-negative or less than infinity');
        if (str.length === 0 || count === 0) return '';
        if (str.length * count >= 1 << 28) throw new Error('repeat count must not overflow maximun string size');
        function repeat(s, time) {
          if (times % 2) return repeat(s, times - 1) + s;
          var half = repeat(s, times / 2);
          return half + half;
        }
        return repeat(str, count);
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
      startsWith: function(searchStr) {
        var thisStr = Str(this);
        if ($ES.isReg(searchStr) || this === null) throw new TypeError('Cannot call method "startsWith" with a ' + this + ' or on ' + this);
        searchStr = Str(searchStr);
        var startArg = arguments.length > 1 ? arguments[1] : undef,
        start = M.max(toInteger(startArg), 0);
        return thisStr.slice(start, start + searchStr.length) === searchStr;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
      endsWith: function(searchStr) {
        var thisStr = Str(this);
        if (isReg(searchStr) || this === null) throw new TypeError('Cannot call method "startsWith" with a ' + this + ' or on ' + this);
        searchStr = Str(searchStr);
        var thisLen = thisStr.length,
        posArg = arguments.length > 1 ? arguments[1] : undef,
        pos = posArg === undef ? thisLen: toInteger(posArg),
        end = M.min(M.max(pos, 0), thisLen);
        return thisStr.slice(end - searchStr.length, end) === searchStr;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
      includes: function(searchStr) {
        var position = arguments.length > 1 ? arguments[1] : undef;
        return this.indexOf.call(this, searchStr, position) !== - 1;
      }
    },
    ! SP.normalize);

    //substr,split,replace bugs TODO

  }

})(this, String, Math);
