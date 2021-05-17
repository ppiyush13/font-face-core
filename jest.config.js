module.exports = {
    coverageReporters: ['html', 'text'],
    testMatch: ['**/src/*.test.js'],
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!<rootDir>/node_modules/',
        '!<rootDir>/src/setup-tests.js',
        '!<rootDir>/src/test-utils/*',
    ],
};
