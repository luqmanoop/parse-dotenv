# parse-dotenv

> Zero-dependency .env to javascript object parser

![Travis (.org)](https://img.shields.io/travis/codeshifu/parse-dotenv.svg)
[![Coverage Status](https://coveralls.io/repos/github/codeshifu/parse-dotenv/badge.svg?branch=master)](https://coveralls.io/github/codeshifu/parse-dotenv?branch=master)

## Installation

```bash
npm install parse-dotenv --save
```

## Usage

```bash
# .env

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
```

```javascript
import parseEnv from "parse-dotenv";

const parsed = parseEnv();

console.log(parsed.DB_CONNECTION); // mysql
```

or provide a path (relative to project root) to env

```javascript
const parseEnv = require("parse-dotenv");

const parsed = parseEnv(".env.example");
console.log(parsed.DB_PORT); // 3306
```

## API

### path

Type: `string`

Default: `path.resolve(process.cwd(), '.env')`

### opts

Type: `Object`

#### opts.emptyLines

Type: `boolean`

Default: false

```javascript
{
  emptyLines: false; // ignore empty lines in env
}
```

## Related

- [sync-dotenv](https://github.com/codeshifu/sync-dotenv) - Keep your .env in
  sync with .env.example

## LICENSE

This project is licensed under [MIT](https://github.com/codeshifu/parse-env/blob/master/LICENSE)
