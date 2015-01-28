(function(global){
  var $ES = global.$ES;
  if($ES){
    $ES.defineProperties(global,{
      //set map TODO
      //https://github.com/WebReflection/es6-collections/blob/master/index.js
      //parseInt BUG TODO
      //https://github.com/es-shims/es5-shim/blob/master/es5-shim.js#L1418
    });
  }
})(this);
