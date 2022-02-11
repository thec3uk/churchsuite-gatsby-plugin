// ...imports
const { QueryParams, fetchEvents } = require('./churchsuite-api-client');

const EVENT_NODE_TYPE = `Event`;

exports.sourceNodes = async (
	{ actions, createContentDigest, createNodeId },
	{
		domain,
		date_start,
		date_end,
		featured,
		category_ids,
		site_ids,
		embed_signup,
		public_signup,
	}
) => {
	const { createNode } = actions;
	const eventData = await fetchEvents(
		domain,
		new QueryParams(
			date_start,
			date_end,
			featured,
			category_ids,
			site_ids,
			embed_signup,
			public_signup
		)
	);

	eventData.forEach(event =>
		createNode({
			...event,
			id: createNodeId(`${EVENT_NODE_TYPE}-${event.id}`),
			parent: null,
			children: [],
			internal: {
				type: EVENT_NODE_TYPE,
				content: JSON.stringify(event),
				contentDigest: createContentDigest(event),
			},
		})
	);
	return;
};

exports.onCreateWebpackConfig = function (
	{ actions },
	{ domain, account, application, authkey }
) {
	actions.setWebpackConfig({
		plugins: [
			plugins.define({
				__GATSBY_PLUGIN_CHURCHSUITE_DOMAIN__: JSON.stringify(domain),
				__GATSBY_PLUGIN_CHURCHSUITE_ACCOUNT__: JSON.stringify(account),
				__GATSBY_PLUGIN_CHURCHSUITE_APPLICATION__:
					JSON.stringify(application),
				__GATSBY_PLUGIN_CHURCHSUITE_AUTH_KEY__: JSON.stringify(authkey),
			}),
		],
	});
};
