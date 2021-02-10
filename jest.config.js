module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'.(ts|tsx|js|jsx)': 'babel-jest',
	},
	testRegex: '(/test/*|\\.(test|spec))\\.(ts|tsx|js)$',
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	// Automatically clear mock calls and instances between every test
	clearMocks: false,
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,
	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',
	// An object that configures minimum threshold enforcement for coverage results
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 0,
		},
	},
};
