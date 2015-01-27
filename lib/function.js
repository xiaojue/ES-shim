(function(global, Fun) {
  var $ES = global.$ES;
  if ($ES) {
    var FP = Fun.prototype;
    $ES.defineProperty(FP, 'bind', function(thisP) {
      return $ES.bind(this,thisP);
    },
    ! FP.bind);
  }
})(this, Function);

