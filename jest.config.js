/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testTimeout: 100001,
	testRegex: '.e2e.test.ts$',
}
