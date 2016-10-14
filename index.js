var moment = require('moment');

function validDate(d) {
	if (moment.isMoment(d)) return d;
	if (d instanceof Date) return moment(d);
	if (typeof d === 'string') {
		d = moment(new Date(d));
		return d.isValid() && d;
	}
	return false;
}

module.exports = exports = function tapdate (t) {
	if (!t) t = require('tap/lib/test').prototype;

	// if it's already present, don't do anything
	if (t.dateAfter) return;

	t.addAssert('dateAfter', 2, function (f, w, message, extra) {
		var found = validDate(f);
		var wanted = validDate(w);

		if (!found) {
			extra.found = f;
			return this.fail('First argument for dateAfter is not a date');
		}
		if (!wanted) {
			extra.found = w;
			return this.fail('Second argument for dateAfter is not a date');
		}

		if (found.unix() > wanted.unix()) {
			return this.pass(message || 'should be after', extra);
		}
		extra.found = found.toISOString();
		extra.wanted = wanted.toISOString();
		extra.compare = '>';

		return this.fail(message || 'should be after', extra);
	});

	t.addAssert('dateBefore', 2, function (f, w, message, extra) {
		var found = validDate(f);
		var wanted = validDate(w);

		if (!found) {
			extra.found = f;
			return this.fail('First argument for dateBefore is not a date');
		}
		if (!wanted) {
			extra.found = w;
			return this.fail('Second argument for dateBefore is not a date');
		}

		if (found.unix() < wanted.unix()) {
			return this.pass(message || 'should be before', extra);
		}

		extra.found = found.toISOString();
		extra.wanted = wanted.toISOString();
		extra.compare = '<';

		return this.fail(message || 'should be before', extra);
	});

	t.addAssert('dateSame', 3, function (f, w, unit, message, extra) {
		var found = validDate(f);
		var wanted = validDate(w);

		if (!found) {
			extra.found = f;
			return this.fail('First argument for dateSame is not a date');
		}
		if (!wanted) {
			extra.found = w;
			return this.fail('Second argument for dateSame is not a date');
		}

		var diff = wanted.diff(found, unit || 'second');
		if (!diff) {
			return this.pass(message || 'should be same ' + unit, extra);
		}

		extra.found = found.toISOString();
		extra.wanted = wanted.toISOString();
		extra.compare = '===';

		return this.fail(message || 'should be same ' + unit, extra);
	});

	t.addAssert('dateNear', 3, function (f, w, range, message, extra) {
		var found = validDate(f);
		var wanted = validDate(w);

		if (!found) {
			extra.found = f;
			return this.fail('First argument for dateNear is not a date');
		}
		if (!wanted) {
			extra.found = w;
			return this.fail('Second argument for dateNear is not a date');
		}

		var diff = Math.abs(wanted.diff(found, 'seconds'));
		if (diff <= range) {
			return this.pass(message || 'should be within ' + range + ' seconds', extra);
		}

		extra.found = found.toISOString();
		extra.wanted = wanted.subtract(range, 'seconds').toISOString() + '-' + wanted.add(range, 'seconds').toISOString();

		return this.fail(message || 'should be within ' + range + ' seconds', extra);
	});
};
