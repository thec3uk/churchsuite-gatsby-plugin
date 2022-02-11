// ...imports
const { QueryParams, fetchEvents } = require('./churchsuite-api-client');

exports.onPreInit = (_, pluginOptions) => {
	console.log(`Loading events for ${pluginOptions.domain}`);
};

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

exports.onCreateWebpackConfig = function (_ref, _ref2) {
	var plugins = _ref.plugins,
		actions = _ref.actions;
	console.log('on create webpack config', _ref2.domain);
	var domain = _ref2.domain;

	actions.setWebpackConfig({
		plugins: [
			plugins.define({
				__GATSBY_PLUGIN_CHURCHSUITE_DOMAIN__: JSON.stringify(domain),
			}),
		],
	});
};
