import { resolve } from 'path';
import { readFileSync } from 'fs';

const DEFAULT_ENV_PATH = resolve(process.cwd(), '.env');
const NEWLINE = '\n';

interface Options {
	emptyLines?: boolean;
	comments?: boolean;
}

interface EnvObject {
	[key: string]: any;
}

const parseEnv = (
	path?: string,
	opts: Options = { emptyLines: false }
): EnvObject => {
	try {
		const env = readFileSync(path || DEFAULT_ENV_PATH, {
			encoding: 'UTF-8',
		});
		const obj: EnvObject = {};
		let newlineCount = 0;
		let commentsCount = 0;

		env
			.split(NEWLINE)
			.map(
				(line): string[] => {
					if (opts.comments && line.startsWith('#')) {
						commentsCount += 1;
						return [`__COMMENT_${commentsCount}__`, line];
					}

					if (line) {
						return line.split('=').map(kv => kv.trim());
					}

					if (opts.emptyLines) {
						newlineCount += 1;
						return [`__EMPTYLINE_${newlineCount}__`, ''];
					}
					return [''];
				}
			)
			.filter(item => item.length > 1)
			.forEach(item => {
				const [key, value] = item;
				obj[key] = value;
			});
		return obj;
	} catch (error) {
		throw new Error(error);
	}
};

export default parseEnv;
