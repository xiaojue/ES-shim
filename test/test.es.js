/**
 * @author xiaojue[designsor@gmail.com]
 * @fileoverview $es for test
 * @date 20150209
 */
describe('$ES',function(){
  describe('$ES.is',function(){
    it('test the value is Number type',function(){
      expect($ES.isNum({a:1})).to.equal(false);
      expect($ES.isNum(1)).to.equal(true);
      expect($ES.isNum("1")).to.equal(false);
    }); 
    it('test the value is Object type',function(){
      expect($ES.isObj({a:1})).to.equal(true);
      expect($ES.isObj("1")).to.equal(false);
      expect($ES.isObj(123)).to.equal(false);
    }); 
    it('test the value is Array type',function(){
      expect($ES.isArr({a:1})).to.equal(false);
      expect($ES.isArr("1")).to.equal(false);
      expect($ES.isArr(123)).to.equal(false);
      expect($ES.isArr([1,2,3])).to.equal(true);
    }); 
    it('test the value is Function type',function(){
      expect($ES.isFun({a:1})).to.equal(false);
      expect($ES.isFun("1")).to.equal(false);
      expect($ES.isFun(123)).to.equal(false);
      expect($ES.isFun(function(){})).to.equal(true);
    }); 
    it('test the value is String type',function(){
      expect($ES.isStr({a:1})).to.equal(false);
      expect($ES.isStr("1")).to.equal(true);
      expect($ES.isStr(123)).to.equal(false);
    }); 
    it('test the value is RegExp type',function(){
      expect($ES.isReg({a:1})).to.equal(false);
      expect($ES.isReg("1")).to.equal(false);
      expect($ES.isReg(new RegExp('1234'))).to.equal(true);
    }); 
  });
  describe('$ES.SameValue',function(){
    it('test the samevalue not NaN',function(){
      expect($ES.SameValue(1,1)).to.equal(true); 
      expect($ES.SameValue(1,'1')).to.equal(false); 
      expect($ES.SameValue('123','123')).to.equal(true); 
      expect($ES.SameValue({a:1},{a:1})).to.equal(true); 
    }); 
    it('test the samevalue is NaN',function(){
      expect($ES.SameValue(NaN,NaN)).to.equal(true); 
    });
  });
});
