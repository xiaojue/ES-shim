(function(global,B){

  var $ES = global.$ES;

  if($ES){
    $ES.defineProperty(B.prototype,'toJSON',$ES._toJSON,!B.prototype.toJSON); 
  }

})(this,Boolean);
