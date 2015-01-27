(function(global, D) {

  var $ES = global.$ES;

  if ($ES) {

    var DP = D.prototype,
    pad = $ES.pad;

    $ES.defineProperty(D, 'now', function() {
      return new D().getTime();
    },
    ! D.now);

    $ES.defineProperty(D.prototype, 'toISOString', function() {
      return this.getUTCFullYear() + '-' + pad(this.getUTCMonth() + 1) + '-' + pad(this.getUTCDate()) + 'T' + pad(this.getUTCHours()) + ':' + pad(this.getUTCMinutes()) + ':' + pad(this.getUTCSeconds()) + '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
    },
    ! DP.toISOString);

    $ES.defineProperty(D.prototype, 'toJSON', function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + pad(this.getUTCMonth() + 1) + '-' + pad(this.getUTCDate()) + 'T' + pad(this.getUTCHours()) + ':' + pad(this.getUTCMinutes()) + ':' + pad(this.getUTCSeconds()) + 'Z': null;
    },
    ! DP.toJSON);

    //Date.parse bug TODO
  }

})(this, Date);

