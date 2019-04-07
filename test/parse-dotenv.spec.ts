import chai, { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import parseEnv from '../lib/parse-dotenv';

chai.use(sinonChai);
const DEFAULT_ENV_PATH = path.resolve(process.cwd(), '.env');

describe('parseEnv', () => {
	afterEach(() => sinon.restore());

	it('throws error for invalid env path', () => {
		try {
			parseEnv('.env.sample');
		} catch (error) {
			expect(error.message).to.include('no such file');
		}
	});

	it('parse using default .env path', () => {
		const spy = sinon.spy(fs, 'readFileSync');
		try {
			parseEnv();
		} catch (error) {
			// eslint-disable-line
		} finally {
			expect(spy).calledWith(DEFAULT_ENV_PATH);
		}
	});

	it('parse .env.example', () => {
		const parsed = parseEnv('.env.example');
		expect(parsed).to.have.deep.property('DB_CONNECTION', 'mysql');
	});

	it('parse .env.example and include empty lnes', () => {
		const parsed = parseEnv('.env.example', { emptyLines: true });
		expect(parsed).to.have.deep.property('__EMPTYLINE_1__', '');
	});
});
