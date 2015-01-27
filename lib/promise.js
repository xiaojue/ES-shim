(function(global, undef) {

  var $ES = global.$ES;

  if ($ES) {
    //ES6 chrome 原生promise也不稳定，不做降级处理，直接重写
    //https://github.com/then/promise
    $ES.defineProperty(global, 'Promise', function() {
      function promise(resolver) {
        if (!$ES.isObj(this)) throw new TypeError('Promises must be constructed via new');
        if (!$ES.isFun(resolver)) throw new TypeError('not a function');
        var state = null,
        thisValue = null,
        deferreds = [],
        self = this;

        function resolve(value) {
          try {
            if (value === self) throw new TypeError('A promise cannot be resolved with itself');
            if (value && ($ES.isObj(value) || $ES.isFun(value))) {
              if ($ES.isFun(value.then)) {
                doResolve($ES.bind(value.then,value), resolve, reject);
                return;
              }
            }
            state = true;
            thisValue = value;
            finale();
          } catch(e) {
            reject(e);
          }
        }
        function reject(reason) {
          state = false;
          thisValue = reason;
          finale();
        }

        function finale() {
          for (var i = 0, len = deferreds.length; i < len; i++) handle(deferreds[i]);
          deferreds = null;
        }

        function handle(deferred) {
          if (state === null) {
            deferreds.push(deferred);
            return;
          }
          asap(function() {
            var cb = state ? deferred.onFulfilled: deferred.onRejected;
            if (cb === null) { (state ? deferred.resolve: deferred.reject)(thisValue);
              return;
            }
            var ret;
            try {
              ret = cb(thisValue);
            } catch(e) {
              deferred.reject(e);
              return;
            }
            deferred.resolve(ret);
          });
        }

        doResolve(resolver, resolve, reject);

      }

      //https://github.com/kriskowal/asap/blob/master/browser-raw.js#L188
      function asap(callback) {
        return function() {
          var timeoutHandle = setTimeout(handleTimer, 0),
          intervalHandle = setInterval(handleTimer, 50);
          function handleTimer() {
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
          }
        };
      }

      function doResolve(fn, resolve, reject) {
        var done = false;
        try {
          fn(function(value) {
            if (done) return;
            done = true;
            resolve(value);
          },
          function(reason) {
            if (done) return;
            done = true;
            reject(reason);
          });
        } catch(e) {
          if (done) return;
          done = true;
          reject(e);
        }
      }

      function deferred(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = isFun(onFulfilled) ? onFulfilled: null;
        this.onRejected = isFun(onRejected) ? onRejected: null;
        this.resolve = resolve;
        this.reject = reject;
      }

      promise.prototype = {
        constructor: promise,
        'catch': function(onRejected) {
          return this.then(null, onRejected);
        },
        'then': function(onFulfilled) {
          if (!isFun(onFulfilled)) return this;
          return new promise(function(resolve, reject) {
            asap(function() {
              try {
                resolve(onFulfilled(value));
              } catch(e) {
                reject(e);
              }
            });
          });
        }
      };
      promise.reject = function(value) {
        return new promise(function(resolve, reject) {
          reject(value);
        });
      };
      promise.resolve = function(value) {
        return new promise(function(resolve, reject) {
          reject(value);
        });
      };
      promise.all = function(arr) {
        var args = $ES.toArray(arr);

        return new Promise(function(resolve, reject) {
          if (args.length === 0) {
            resolve([]);
            return;
          }
          var remaining = args.length;
          function res(i, val) {
            try {
              if (val && ($ES.isObj(val) || $ES.isFun(val))) {
                var then = val.then;
                if ($ES.isFun(then)) {
                  then.call(val, function(val) {
                    res(i, val);
                  },
                  reject);
                  return;
                }
              }
              args[i] = val; --remaining;
              if (remaining === 0) resolve(args);
            } catch(e) {
              reject(e);
            }
          }
          for (var i = 0; i < arges.length; i++) {
            res(i, args[i]);
          }
        });
      };
      promise.race = function(values) {
        return new promise(function(resolve, reject) {
          $ES.forEach(values,function(value) {
            promise.reslove(value).then(resolve, reject);
          });
        });
      };
      return promise;
    } (), true);

  }

})(this);

