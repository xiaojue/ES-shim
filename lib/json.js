(function(global,Str,undef) {

  var $ES = global.$ES;
  if ($ES) {

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    jsonreg1 = /^[\],:{}\s]*$/,
    jsonreg2 = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    jsonreg3 = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    jsonreg4 = /(?:^|:|,)(?:\s*\[)+/g;

    function walk(holder, key, reviver) {
      var k, v, value = holder[key];
      if (value && $ES.isObj(value)) {
        for (k in value) {
          if (value.hasOwnProperty(k)) {
            v = walk(value, k, reviver);
            if (v !== undef) {
              value[k] = v;
            } else {
              delete value[k];
            }
          }
        }
      }
      return reviver.call(holder, key, value);
    }

    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    meta = {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\'
    },
    gap = '';

    function quote(string) {
      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
        var c = meta[a];
        return isStr(c) ? c: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(4);
      }) + '"': '"' + string + '"';
    }

    function str(key, holder, indent, rep) {
      var i, k, v, length, mind = gap,
      partial, value = holder[key];
      if (value && $ES.isObj(value) && $ES.isFun(value.toJSON)) {
        value = value.toJSON(key);
      }
      if ($ES.isFun(rep)) {
        value = rep.call(holder, key, value);
      }
      switch (typeof value) {
      case 'string':
        return quote(value);
      case 'number':
        return isFinite(value) ? Str(value) : 'null';
      case 'boolean':
      case 'null':
        return Str(value);
      case 'object':
        if (!value) return 'null';
        gap += indent;
        partial = [];
        if (isArr(value)) {
          length = value.length;
          for (i = 0; i < length; i++) {
            partial[i] = str(i, value, indent, rep) || 'null';
          }
          v = partial.length === 0 ? '[]': gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']': '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }
        if (rep && isObj(rep)) {
          length = rep.length;
          for (i = 0; i < length; i++) {
            if ($ES.isStr(rep[i])) {
              k = rep[i];
              v = str(k, value, indent, rep);
              if (v) partial.push(quote(k) + (gap ? ': ': ':') + v);
            }
          }
        } else {
          for (k in value) {
            if (value.hasOwnProperty(k)) {
              v = str(k, value, indent, rep);
              if (v) partial.push(quote(k) + (gap ? ': ': ':') + v);
            }
          }
        }
        break;
      default:
        break;
      }
      v = partial.length === 0 ? '{}': gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}': '{' + partial.join(',') + '}';
      gap = mind;
      return v;
    }
    $ES.defineProperty(global, 'JSON', {
      parse: function(text, reviver) {
        var json;
        text = Str(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function(a) {
            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice( - 4);
          });
        }
        if (jsonreg1.test(text.replace(jsonreg2, '@').replace(jsonreg3, ']').replace(jsonreg4, ''))) {
          json = eval('(' + text + ')');
          return $ES.isFun(reviver) ? walk({
            '': json
          },
          '', reviver) : json;
        }
        throw new SyntaxError('JSON.parse ' + text);
      },
      stringify: function(value, replacer, space) {
        var indent = '';
        if ($ES.isNum(space)) {
          for (var i = 0; i < space; i++) {
            indent += ' ';
          }
        } else if (isStr(space)) {
          indent = space;
        }
        if (replacer && ! $ES.isFun(replacer) && (!$ES.isObj(replacer) || ! $ES.isNum(replacer.length))) {
          throw new Error('JSON.stringify ' + value);
        }
        return str('', {
          '': value
        },
        indent, replacer);
      }
    },
    ! global.JSON);
  }

})(this,String);

