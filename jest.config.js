module.exports = {
    verbose: true,
    preset: '@shelf/jest-dynamodb',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
};
