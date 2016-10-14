var test = require('tap').test;
var tapdate = require('./')();
var Test = require('tap/lib/test');

test('dates are not dates', (t) => {
	var tt = new Test();

	t.notOk(tt.dateAfter('null', '2010-01-01'));
	t.notOk(tt.dateAfter(null, '2010-01-01'));
	t.notOk(tt.dateAfter(0, '2010-01-01'));
	t.notOk(tt.dateAfter({}, '2010-01-01'));
	t.notOk(tt.dateAfter('', '2010-01-02'));

	t.end();
});

test('date is after', (t) => {
	var tt = new Test();

	t.dateAfter('2010-01-02', '2010-01-01');
	t.notOk(tt.dateAfter('2010-01-01', '2010-01-01'));
	t.notOk(tt.dateAfter('2010-01-01', '2010-01-02'));

	t.end();
});

test('date is before', (t) => {
	var tt = new Test();

	t.dateBefore('2010-01-01', '2010-01-02');
	t.notOk(tt.dateBefore('2010-01-01', '2010-01-01'));
	t.notOk(tt.dateBefore('2010-01-02', '2010-01-01'));

	t.end();
});

test('date is same', (t) => {
	var tt = new Test();

	t.dateSame('2010-01-01 00:01:10', '2010-01-01 00:01:30', 'day');
	t.notOk(tt.dateSame('2010-01-01 00:01:10', '2010-02-01 00:01:10', 'day'));
	t.notOk(tt.dateSame('2010-02-01 00:01:10', '2010-01-01 00:01:10', 'day'));

	t.dateSame('2010-01-01 00:01:10', '2010-01-01 00:01:30', 'hour');
	t.notOk(tt.dateSame('2010-01-01 00:01:10', '2010-01-01 01:02:10', 'hour'));
	t.notOk(tt.dateSame('2010-01-01 00:01:10', '2010-01-01 01:02:30', 'hour'));

	t.dateSame('2010-01-01 00:01:10', '2010-01-01 00:01:30', 'minute');
	t.notOk(tt.dateSame('2010-01-01 00:01:10', '2010-01-01 00:01:30', 'second'));

	t.end();
});

test('date is near', (t) => {
	var tt = new Test();

	t.notOk(tt.dateNear('2010-02-01 00:01:08', '2010-01-01 00:01:10', 1));
	         t.dateNear('2010-01-01 00:01:09', '2010-01-01 00:01:10', 1);
	         t.dateNear('2010-01-01 00:01:10', '2010-01-01 00:01:10', 1);
	         t.dateNear('2010-01-01 00:01:10', '2010-01-01 00:01:11', 1);
	t.notOk(tt.dateNear('2010-01-01 00:01:10', '2010-01-01 00:01:12', 1));

	         t.dateNear('2010-01-01 00:01:00', '2010-01-01 00:01:30', 90);

	t.end();
});
