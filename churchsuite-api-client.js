const fetch = require('node-fetch');

const fetchEvents = async (domain, params) => {
	const response = await fetch(eventsUrl(domain, params));
	return await response.json();
};

const signUpToEvent = async (eventId, data) => {
	const opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Account': __GATSBY_PLUGIN_CHURCHSUITE_ACCOUNT__,
			'X-Application': __GATSBY_PLUGIN_CHURCHSUITE_APPLICATION__,
			'X-Auth': __GATSBY_PLUGIN_CHURCHSUITE_AUTH_KEY__,
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			action: 'add',
			signups: [
				{
					...data,
				},
			],
		}),
	};
	console.log('opts for request', opts);
	return await fetch(signUpUrl(eventId), opts);
};

const signUpUrl = eventId =>
	`https://api.churchsuite.co.uk/v1/calendar/event/1016/signups`; // will be event id but hardcoding for testing

const eventsUrl = (d, qp) => {
	const p = Object.keys(qp)
		.filter(f => !!qp[f])
		.map(m => `${m}=${qp[m]}`);
	return `https://${d}/embed/calendar/json?${p.join('&')}`;
};

class QueryParams {
	constructor(
		date_start,
		date_end,
		featured,
		category_ids,
		site_ids,
		embed_signup,
		public_signup
	) {
		this.date_start = date_start;
		this.date_end = date_end;
		this.featured = featured;
		this.category_ids = category_ids;
		this.site_ids = site_ids;
		this.embed_signup = embed_signup;
		this.public_signup = public_signup;
	}
}

module.exports = {
	QueryParams,
	buildUrl: eventsUrl,
	fetchEvents,
	signUpToEvent,
};
