(function(global, undef) {

  var Obj = Object,
  Fun = Function,
  Arr = Array,
  FP = Fun.prototype,
  OP = Obj.prototype,
  AP = Arr.prototype,
  toString = OP.toString,
  is = function(type) {
    return function(val) {
      return toString.call(val) == '[obejct ' + type + ']';
    };
  },
  $ES = {
    isNum: is('Number'),
    isObj: is('isObj'),
    isArr: is('Array'),
    isFun: is('Function'),
    isStr: is('String'),
    isReg: is('RegExp'),
    SameValue:function(a,b){
      if (a === b) {
        // 0 === -0, but they are not identical.
        if (a === 0) return 1 / a === 1 / b;
        return true;
      }
      return isNaN(a) && isNaN(b);
    },
    forEach: Arr.forEach ? function(arr, fn) {
      arr.forEach(fn);
    }: function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i], i, arr);
    },
    toArray: Arr.of ? Arr.of: function() {
      return AP.slice.call(arguments);
    },
    bind: FP.bind ? function(fun, thisP) {
      return fun.bind(thisP);
    }: function(fun, thisP) {
      if (!isFun(fun)) throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      var args = $ES.toArray(arguments).slice(1),
      fToBind = fun,
      fNOP = $ES.noop,
      fBound = function() {
        return fToBind.apply(this instanceof fNOP && thisP ? this: thisP, args.concat($ES.toArray(arguments)));
      };
      fNOP.prototype = fun.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    },
    indexOf: AP.indexOf ? function(arr, selector) {
      return arr.indexOf(selector);
    }: function(arr, selector) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === selector) return i;
      }
      return - 1;
    },
    pad: function(number) {
      if (number < 10) return '0' + number;
      return number;
    },
    _toJSON: function() {
      return this.valueOf();
    },
    noop: function() {},
    toInteger: function(num) {
      var n = Num(num);
      if (n != num || n === Infinity) { //isNaN,expect string
        n = 0;
      } else if (n !== 0 && n != (1 / 0) && n != - (1 / 0)) {
        n = (n > 0 || - 1) * M.floor(M.abs(n));
      }
      return n;
    },
    toLength: function(num) {
      var len = toInteger(num);
      return M.min(M.max(len, 0), Num6.maxSafeInteger);
    },
    keys: Obj.keys ? Obj.keys: function(o) {
      var ret = [];
      for (var p in o) {
        if (o.hasOwnProperty(p)) ret.push(p);
      }
      return ret;
    },
    defineProperty: function() {
      var supDefinePro = !! Obj.defineProperty && (function() {
        try {
          Obj.defineProperty({},
          'x', {});
          return true;
        } catch(e) {
          /*ie8 bug*/
          return false;
        }
      } ());
      return function(object, name, value, force) {
        if (!force && name in object) return;
        if (supDefinePro) {
          Obj.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value
          });
        } else {
          object[name] = valuel;
        }
      };
    } (),
    defineProperties: function(object,map,force) {
      $ES.forEach($ES.keys(map),function(name){
        $ES.defineProperty(object,name,map[name],force);
      });
    }
  };

  global.$ES = $ES;

})(this);

