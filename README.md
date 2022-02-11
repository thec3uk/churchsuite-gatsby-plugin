# churchsuite-gatsby-plugin

Gatsby source plugin for sourcing data into your Gatsby application from [churchsuite api](https://github.com/ChurchSuite/churchsuite-api)

[![npm](https://badgen.net/npm/v/churchsuite-events-gatsby-plugin)](https://www.npmjs.com/package/churchsuite-events-gatsby-plugin)

- [churchsuite-gatsby-plugin](#churchsuite-gatsby-plugin)
  - [Install](#install)
  - [Add to project](#add-to-project)
  - [Imported data](#imported-data)
    - [Calendar JSON feed](#calendar-json-feed)
  - [Available methods](#available-methods)
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
			options: {
        // related to calendar embed that runs on build
        domain: `YOUR_CHURCHSUITE_DOMAIN` // referred to as {your_account_id} in CS docs.
        date_start: `yyy-mm-dd`,
				date_end: `yyy-mm-dd`,
				featured: `0|1`,
				category_ids: `1,2`, // comma seperated list
				site_ids: '', // comma seperated list
				embed_signup: `boolean`,
				public_signup: `boolean`,
        // used by event sign up
        account: 'YOUR_CHURCHSUITE_X-ACCOUNT_HEADER_VALUE',
        application: 'YOUR_CHURCHSUITE_X-APPLICATION_HEADER_VALUE',
        authkey: 'YOUR_CHURCHSUITE_X-AUTH_HEADER_VALUE'
        },
		},
	]
```

All the options listed here (besides domain) are passed through to churchsuite-api so you can refer to CS docs for full list of accepted values.

## Imported data

### Calendar JSON feed

Calendar events imported from [churchsuite-api calendar embed](https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md#calendar-json-feed)

These can be accessed via gatsby Graphql using a query like

```graphql
query allEvents {
  allEvent {
    nodes {
      id
      name
      datetime_start
      datetime_end
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

## Available methods

```javascript
function signUp(eventId, data) {}
```

eventId - the string identifier of your event, retreieved from graphql allEvents query.
data - an object container the data for the sign up, e.g

```javascript
{
  first_name: 'Mark',
  last_name: 'Davies',
  mobile: '',
  email: 'mark.davies@gmail.com',
}
```

## License

[0BSD License](./LICENSE)
