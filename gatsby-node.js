// ...imports
const fetch = require('node-fetch');

exports.onPreInit = (_, pluginOptions) => {
	console.log(`Loading events for ${pluginOptions.domain}`);
};

const EVENT_NODE_TYPE = `Event`;
const url = domain => `https://${domain}/embed/calendar/json`;

const getEmbedEvents = async url => {
	const response = await fetch(url);
	return await response.json();
};

exports.sourceNodes = async (
	{ actions, createContentDigest, createNodeId },
	{ domain }
) => {
	const { createNode } = actions;
	const eventData = await getEmbedEvents(url(domain));

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
