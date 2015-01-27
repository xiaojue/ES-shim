(function(global, Obj, Arr) {

  var $ES = global.$ES;

  if ($ES) {

    var OP = Obj.prototype;

    //ES5
    $ES.defineProperties(Obj, {
      keys: $ES.keys,
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
      create: function() {
        var Temp = function() {};
        return function(prototype) {
          if (arguments.length > 1) throw new Error('Second argument not supported');
          if (!$ES.isObj(prototype)) throw new TypeError('Argument must be an object');
          Temp.prototype = prototype;
          var result = new Temp();
          Temp.prototype = null;
          return result;
        };
      } (),
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
      //不能保证完全一致,暂不实现
      /*
      getPrototypeOf: function() { },
      getOwnPropertyNames: function() { },
      getOwnPropertDescriptor: function() { },
      */
      defineProperty: $ES.defineProperty //暂时借用ES的实现
    },
    ! Obj.create);

    //ES6
    $ES.defineProperties(OP, {
      is: $ES.SameValue,
      assign: function(target, source) {
        if (!$ES.isObj(target)) throw new TypeError('target must be an object');
        return Arr.prototype.reduce.call(arguments, function(target, source) {
          return $ES.keys(Obj(source)).reduce(function(target, key) {
            target[key] = source[key];
            return target;
          },
          target);
        });
      }
      /*由于 __proto__ 兼容问题暂不实现 TODO
      ,setPrototypeOf: function() {

      }
      */
    },
    ! OP.assign);

  }

})(this, Object,Array);

