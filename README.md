# ES-shim

Simpleness ES5,6 shim for client javascript.

You can use some [ES5][1] or [ES6][2] features with old browsers,like `Promise` `JSON` `Array.prototype.forEach` `String.prototyp.repeat` etc.

----

## Why ES-shim ?

[ES5-shim][3],[ES6-shim][4] is very heavy and complex,and they are not decomposable.

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

1.Array.from
2.Array.of

3.Array.prototype.copyWithin
4.Array.prototype.fill
5.Array.prototype.find
6.Array.prototype.findIndex
7.Array.prototype.keys
8.Array.prototype.entries
9.Array.prototype.values

10.Array.isArray

11.Array.prototype.every
12.Array.prototype.filter
13.Array.prototype.forEach
14.Array.prototype.indexOf
15.Array.prototype.lastIndexOf
16.Array.prototype.map
17.Array.prototype.some
18.Array.prototype.reduce
19.Array.prototype.reduceRight

20.Array.prototype.unshift [fix bug][6]

#### Boolean 

1.Boolean.prototype.toJSON

#### Date 

1.Date.now
2.Date.toISOString
3.Date.toJSON

#### Function

1.Function.prototype.bind

#### Math

1.Math.acosh
2.Math.asinh
3.Math.atanh
4.Math.cbrt
5.Math.clz32
6.Math.cosh
7.Math.expm1
8.Math.hypot
9.Math.log2
10.Math.log10
11.Math.log1p
12.Math.sign
13.Math.sinh
14.Math.tanh
15.Math.trunc
16.Math.imul
17.Math.fround

18.Math.round [fix bug][7]

#### Number

1.Number.prototype.toJSON
2.Number.prototype.toFixed [fix bug][8]

3.Number.MAX_SAFE_INTEGER
4.Number.MIN_SAFE_INTEGER
5.Number.EPSILON
6.Number.parseInt
7.Number.parseFloat
8.Number.isFinite
9.Number.isNaN
10.Number.isInteger
11.Number.isSafeInteger

#### Regexp

1.Regexp.prototype.flags [function shim,not attributes][9]

#### Object

1.Object.keys
2.Object.create
3.Object.defineProperty

`defineProperty` and `create` is not a standard implementation,just a [basic function imitation][10].

4.Object.is
5.Object.assign

#### String

1.Srting.prototype.trim
2.Srting.prototype.toJSON

3.String.fromCodePoint
4.String.raw

5.String.prototype.codePointAt
6.String.prototype.repeat
7.String.prototype.startsWith
8.String.prototype.endsWith
9.String.prototype.includes

#### Promise

1.Promise.prototype.catch
2.Promise.prototype.then

3.Promise.reject
4.Promise.resolve
5.Promise.race
6.Promise.all

#### JSON

1.JSON.parse
2.JSON.stringify

## License

MIT License
