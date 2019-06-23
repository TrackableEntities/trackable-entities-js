/**
 * @type {Partial<jest.InitialOptions>}
 */
const config = {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).ts?(x)',
  ],
  testPathIgnorePatterns: ['dist', 'src/models'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  }
}

module.exports = config
