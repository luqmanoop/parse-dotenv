const path = require('path');
const fs = require('fs');

const DEFAULT_ENV_PATH = path.resolve(process.cwd(), '.env');
const NEWLINE = '\n';

const defaultOpts = {
  newline: false
};

const parse = (path = DEFAULT_ENV_PATH, opts = defaultOpts) => {
  if (!path) throw new Error('env path is gmissing');
  try {
    const env = fs.readFileSync(path, { encoding: 'utf-8' });
    const obj = {};
    let newlineCount = 0;
    env
      .split(NEWLINE)
      .map(line => {
        if (line) {
          return line.split('=').map(kv =>
            kv
              .trim()
              .replace(/^("|')/, '')
              .replace(/("|')$/, '')
          );
        } else if (opts.newline) {
          newlineCount++;
          return [[`__NEWLINE_${newlineCount}__`], ''];
        }
      })
      .filter(item => item !== undefined)
      .forEach(item => {
        obj[item[0]] = item[1];
      });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = parse;
