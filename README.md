TapDate
===

TapDate is a mixin for the [node-tap](http://www.node-tap.org) testing framework. It extends the tap test harness with new assertions for performing comparisons of date values.

## Installation

TapDate requires that node-tap be installed as a peer dependency.

```
npm install tap tapdate
```

## Usage

TapDate may be applied strictly to an individual test...

```js
var test = require('tap').test;
var tapdate = require('tapdate');

test('some test', function (t) {
	tapdate(t);

	t.dateSame('2010-01-01 00:01:10', '2010-01-01 00:01:30');
	t.end();
});
```

... or to the tap framework as a whole.

```js
var test = require('tap').test;
var Test = require('tap/lib/test');
require('tapdate')(Test.prototype);

test('some test', function (t) {
	t.dateBefore('2010-01-01 00:01:10', '2010-01-01 00:01:30');
	t.end();
});
```

If your `node_modules` tree is structured such that tapdate and tap exist on the same level, you can also apply to the whole framework by omitting the first argument:

```js
var test = require('tap').test;
require('tapdate')();

test('some test', function (t) {
	t.dateNear('2010-01-01 00:01:10', '2010-01-01 00:01:11', 10);
	t.end();
});
```

## Assertions

Date values may be Date objects, moment objects, or formatted date strings. If any value is unparsable as a date, the assertion will fail.

- **`dateAfter(found, wanted, [message])`** - Asserts that the found date occurs after the wanted date.

- **`dateBefore(found, wanted, [message])`** - Asserts that the found date occurs before the wanted date.

- **`dateSame(found, wanted, [unit], [message])`** - Asserts that the found date is the same as the wanted date. A time unit (second, minute, hour, day, etc) may be passed to control how specific this assertion will test.

- **`dateNear(found, wanted, tolerance, [message])`** - Asserts that the found date occurs within `tolerance` seconds of the wanted date.

