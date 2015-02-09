(function(global, Num, M) {

  var $ES = global.$ES;
  if ($ES) {
    var NP = Num.prototype;
    $ES.defineProperties(NP, {
      toJSON: $ES.toJSON,
      toFixed: function(fractionDigits) {
        //https://bugzilla.mozilla.org/show_bug.cgi?id=186563#c5
        //http://hushc.sinaapp.com/post/90.html
        var num = Num(this);
        return (M.round(num * M.pow(10, fractionDigits)) / M.pow(10, fractionDigits) + M.pow(10, - (fractionDigits + 1))).toString().slice(0, - 1);
      }
    },
    true);

    var maxSafeInteger = M.pow(2, 53) - 1;

    $ES.defineProperties(Num, {
      MAX_SAFE_INTEGER: maxSafeInteger,
      MIN_SAFE_INTEGER: - maxSafeInteger,
      EPSILON: 2.220446049250313e-16,
      parseInt: global.parseInt,
      parseFloat: global.parseFloat,
      isFinite: global.isFinite,
      isNaN: global.isNaN,
      isInteger: function(x) {
        return global.isFinite(x) && x === $ES.toInteger(x);
      },
      isSafeInteger: function(x) {
        return this.isInteger(x) && M.abs(x) <= this.MAX_SAFE_INTEGER;
      }
    },!Num.MAX_SAFE_INTEGER);

  }

})(this, Number, Math);

