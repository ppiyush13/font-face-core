module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: ['html', 'text'],
    testMatch: ['**/src/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-tests-after-env.js'],
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!<rootDir>/node_modules/',
        '!<rootDir>/src/setup-tests.js',
        '!<rootDir>/src/test-utils/*',
    ],
    coverageThreshold: {
        global: {
            lines: 100,
            branches: 100,
            functions: 100,
            statements: 100,
        },
    },
};

