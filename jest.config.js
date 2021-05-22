module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: ['html', 'text'],
    testMatch: ['**/src/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-tests-after-env.ts'],
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!<rootDir>/node_modules/',
        '!<rootDir>/src/setup-tests-after-env.ts',
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
