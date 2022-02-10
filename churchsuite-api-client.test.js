const utils = require('./churchsuite-api-client');

test('build url with query params', () => {
	const domain = 'test.co.uk';
	const params = new utils.QueryParams(
		'2022-02-09',
		'2022-02-28',
		'1',
		'51,15',
		'1',
		'1',
		'0'
	);
	const actual = utils.buildUrl(domain, params);

	expect(actual).toBe(
		`https://${domain}/embed/calendar/json?date_start=2022-02-09&date_end=2022-02-28&featured=1&category_ids=51,15&site_ids=1&embed_signup=1&public_signup=0`
	);
});

test('emit empty params', () => {
	const domain = 'test.co.uk';
	const params = new utils.QueryParams('2022-02-09', '2022-02-28');
	const actual = utils.buildUrl(domain, params);

	expect(actual).toBe(
		`https://${domain}/embed/calendar/json?date_start=2022-02-09&date_end=2022-02-28`
	);
});
