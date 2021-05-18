module.exports = {
    testEnvironment: 'node',
    coverageReporters: ['html', 'text'],
    testMatch: ['**/src/*.test.js'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-tests-after-env.js'],
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!<rootDir>/node_modules/',
        '!<rootDir>/src/setup-tests.js',
        '!<rootDir>/src/test-utils/*',
    ],
};
