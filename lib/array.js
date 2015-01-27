(function(global, Arr, Obj, M, undef) {

  var $ES = global.$ES;

  if ($ES) {

    var AP = Arr.prototype;

    //ES6
    $ES.defineProperties(Arr, {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
      from: function(arrayLike, mapFn, thisP) {
        var O = this;
        var items = Obj(arrayLike);
        if (arrayLike === null) throw new TypeError('Array.from requires an array-like object');
        if (!$ES.isFun(mapFn)) throw new TypeError('Array.from when provided,the second argument must be function');
        var len = $ES.toLength(items.length),
        k,
        arr = $ES.isFun(O) ? Obj(new O(len)) : new Arr(len);
        while (k < len) {
          if (mapFn) arr[k] = mapFn.call(thisP, items[k], k);
          else arr[k] = items[k];
          k++;
        }
        arr.length = len;
        return arr;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
      of: $ES.toArray
    },
    ! Arr.from);

    //ES6
    $ES.defineProperties(AP, {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin
      //最后一个参数为可选参数，省略则为数组长度。该方法在数组内复制从start(包含start)位置到end(不包含end)位置的一组元素[覆盖]到以target为开始位置的地方。
      copyWithin: function(target, start, end) {
        var O = Obj(this),
        len = O.length >>> 0,
        relativeTarget = target >> 0,
        to = relativeTarget < 0 ? M.max(len + relativeTarget, 0) : M.min(relativeTarget, len),
        relativeStart = start >> 0,
        from = relativeStart < 0 ? M.max(len + relativeStart, 0) : M.min(relativeStart, len),
        relativeEnd = end === undef ? len: end >> 0,
        relativeFinal = relativeEnd < 0 ? M.max(len + relativeEnd, 0) : M.min(relativeEnd, len),
        count = M.min(relativeFinal - from, len - to),
        direction = 1;
        if (from < to && to < (from + count)) {
          direction = - 1;
          from += count - 1;
          to += count - 1;
        }
        while (count > 0) {
          if (from in O) O[to] = O[from];
          else delete O[to];
          from += direction;
          to += direction;
          count--;
        }
        return O;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
      //fill()方法用一个值填充数组给定开始和结束位置之间的的所有值
      fill: function(value, start, end) {
        var O = Obj(this),
        len = O.length >>> 0,
        relativeStart = start >> 0,
        k = relativeStart < 0 ? M.max(len + relativeStart, 0) : M.min(relativeStart, len),
        relativeEnd = end === undef ? len: end >> 0,
        relativeFinal = relativeEnd < 0 ? M.max(len + relativeEnd, 0) : M.min(relativeEnd, len);
        while (k < relativeFinal) {
          O[k] = value;
          k++;
        }
        return O;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      //find()方法返回数组中符合条件的第一个元素，如果没有则返回undefind
      find: function(fun, thisP) {
        var O = Obj(this),
        len = O.length >>> 0;
        if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
        for (var i = 0; i < len; i++) {
          if (fun.call(thisP, O[i], i, O)) return O[i];
        }
        return undef;
      },
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
      //findIndex()方法与find()方法用法类似，返回的是第一个符合条件的元素的索引，如果没有则返回-1。
      findIndex: function(fun, thisP) {
        var O = Obj(this),
        len = O.length >>> 0;
        if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
        for (var i = 0; i < len; i++) {
          if (fun.call(thisP, O[i], i, O)) return i;
        }
        return - 1;
      },
      //keys entries value 返回ArrayIterator迭代器
      keys: function() {
        return new ArrayIterator(this, 'keys');
      },
      entries: function() {
        return new ArrayIterator(this, 'entries');
      },
      values: function() {
        return new ArrayIterator(this, 'values');
      }
    },
    ! AP.copyWithin);

    //https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L733
    function ArrayIterator(array, kind) {
      this.i = 0;
      this.array = array;
      this.kind = kind;
    }
    //@xiaojue Modify 
    ArrayIterator.prototype.next = function() {
      var i = this.i,
      array = this.array,
      kind = this.kind;
      if (! (this instanceof ArrayIterator)) throw new TypeError('Not an ArrayIterator');
      if (isArr(array)) {
        var len = array.length >>> 0;
        for (; i < len; i++) {
          var retval = {
            'keys': i,
            'values': array[i],
            'entries': [i, array[i]]
          };
          this.i = i + 1;
          return {
            value: retval[kind],
            done: false
          };
        }
      }
      this.array = undef;
      return {
        value: undef,
        done: true
      };
    };

    //ES5
    $ES.defineProperty(Arr, 'isArray',$ES.isArr, !Arr.isArray);

    $ES.defineProperties(AP, {
      //https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
      every: function(fun, thisP) {
        var O = Obj(this),
        len = O.length >>> 0,
        k = 0;
        if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
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
        if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
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
        if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
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
        n = $ES.toInteger(fromIndex);
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
          n = $ES.toInteger(fromIndex);
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
        if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
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
        if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
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
    },
    ! AP.forEach); //不存在forEach，增加所有ES5的特性
    function reduce(source, fun, initialValue, type) {
      var len = source.length >>> 0,
      isLeft = type === 'left',
      k = isLeft ? 0: len - 1,
      t,
      index,
      express,
      value;
      if (!$ES.isFun(fun)) throw new TypeError(fun + ' is not a function');
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
        if (k in source) value = fun.call(undef, value, source[k], k, source);
        k += ( !! isLeft || - 1);
      }
      return value;
    }

    //BUGS
    $ES.defineProperty(AP,'unshift',function() {
        AP.unshift.apply(this, arguments);
        return this.length;
    }, [].unshift(0) !== 1);

  }

})(this, Array, Object, Math);
