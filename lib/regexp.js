(function(global,Reg){
  var $ES = global.$ES;
  if($ES){
    var RP = Reg.prototype;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
    $ES.defineProperties(RP,{
      //attributes change method
      flags:function(){
        return this.toString().match(/[gimuy]*$/)[0];      
      }
    },!$ES.isFun(RP.flags));
  }
})(this,RegExp);
