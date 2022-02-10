# churchsuite-gatsby-plugin

Gatsby source plugin for sourcing data into your Gatsby application from [churchsuite api](https://github.com/ChurchSuite/churchsuite-api)

[![npm](https://badgen.net/npm/v/churchsuite-events-gatsby-plugin)](https://www.npmjs.com/package/churchsuite-events-gatsby-plugin)

- [Install](#install)
- [Add to project](#add-to-project)
- [Imported data](#imported-data)
- [License](#license)

---

## Install

```sh
# using npm
npm install churchsuite-gatsby-plugin

# using yarn
yarn add churchsuite-gatsby-plugin
```
## Add to project

```javascript
// In gatsby-config.js
plugins: [
		{
			resolve: 'churchsuite-events-gatsby-plugin',
			options: { domain: `YOUR_CHURCHSUITE_DOMAIN` }, // referred to as {your_account_id} in CS docs.
		},
	]
```
## Imported data

### Calendar JSON feed

Calendar events imported from [churchsuite-api calendar embed](https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md#calendar-json-feed)

These can be accessed via gatsby Graphql using a query like

```graphql
query allEvents {
  allEvent(limit: 5) {
    nodes {
      id
      name
      datetime_start
      datetime_start
      identifier
      // etc
    }
    pageInfo {
      // paging information
    }
  }
}
```
A full list of available fields can be seen in the Gatsby graphql explorer.

## License

[0BSD License](./LICENSE)
