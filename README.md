# ES-shim

Simpleness ES5,6 shim for client javascript.

You can use some [ES5][1] or [ES6][2] features with old browsers,like `Promise` `JSON` `Array.prototype.forEach` `String.prototyp.repeat` etc.

----

## Why ES-shim ?

[ES5-shim][3],[ES6-shim][4] are can't decomposed and complicated.

[ES-shim][5] is decomposable and simpler and more applied to actual projects.

----

## How to use ?

```html
<script src="es.js"></script>
<script src="array.js"></script> <!-- The Array's ES5,6 features are availabled -->
```

----

### Supported Features

#### Array

- `Array.from`
- `Array.of`
- `Array.prototype.copyWithin`
- `Array.prototype.fill`
- `Array.prototype.find`
- `Array.prototype.findIndex`
- `Array.prototype.keys`
- `Array.prototype.entries`
- `Array.prototype.values`
- `Array.isArray`
- `Array.prototype.every`
- `Array.prototype.filter`
- `Array.prototype.forEach`
- `Array.prototype.indexOf`
- `Array.prototype.lastIndexOf`
- `Array.prototype.map`
- `Array.prototype.some`
- `Array.prototype.reduce`
- `Array.prototype.reduceRight`
- `Array.prototype.unshift` [fix bug][6]

#### Boolean 

- `Boolean.prototype.toJSON`

#### Date 

- `Date.now`
- `Date.toISOString`
- `Date.toJSON`

#### Function

- `Function.prototype.bind`

#### Math

- `Math.acosh`
- `Math.asinh`
- `Math.atanh`
- `Math.cbrt`
- `Math.clz32`
- `Math.cosh`
- `Math.expm1`
- `Math.hypot`
- `Math.log2`
- `Math.log10`
- `Math.log1p`
- `Math.sign`
- `Math.sinh`
- `Math.tanh`
- `Math.trunc`
- `Math.imul`
- `Math.fround`
- `Math.round` [fix bug][7]

#### Number

- `Number.prototype.toJSON`
- `Number.prototype.toFixed` [fix bug][8]
- `Number.MAX_SAFE_INTEGER`
- `Number.MIN_SAFE_INTEGER`
- `Number.EPSILON`
- `Number.parseInt`
- `Number.parseFloat`
- `Number.isFinite`
- `Number.isNaN`
- `Number.isInteger`
- `Number.isSafeInteger`

#### Regexp

- `Regexp.prototype.flags` [function shim,not attributes][9]

#### Object

- `Object.keys`
- `Object.create`
- `Object.defineProperty`

`defineProperty` and `create` is not a standard implementation,just a [basic function imitation][10].

- `Object.is`
- `Object.assign`

#### String

- `Srting.prototype.trim`
- `Srting.prototype.toJSON`
- `String.fromCodePoint`
- `String.raw`
- `String.prototype.codePointAt`
- `String.prototype.repeat`
- `String.prototype.startsWith`
- `String.prototype.endsWith`
- `String.prototype.includes`

#### Promise

- `Promise.prototype.catch`
- `Promise.prototype.then`
- `Promise.reject`
- `Promise.resolve`
- `Promise.race`
- `Promise.all`

#### JSON

- `JSON.parse`
- `JSON.stringify`

## License

MIT License


  [1]: http://kangax.github.io/compat-table/es5/
  [2]: http://kangax.github.io/compat-table/es6/
  [3]: https://github.com/es-shims/es5-shim
  [4]: https://github.com/paulmillr/es6-shim
  [5]: https://github.com/xiaojue/ES-shim
  [6]: https://github.com/es-shims/es5-shim/blob/master/es5-shim.js#L380
  [7]: https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L1279
  [8]: http://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
  [9]: https://github.com/xiaojue/ES-shim/blob/master/lib/regexp.js#L8
  [10]: https://github.com/xiaojue/ES-shim/blob/master/lib/%24es.js#L88
