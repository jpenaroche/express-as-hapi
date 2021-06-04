module.exports = {
  globals: {'ts-jest': {tsconfig: '<rootDir>/tsconfig.spec.json'}},
  testEnvironment: 'node',
  testMatch: ['**/+(*.)+(spec|test).+(ts)?(x)'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@config(.*)$': '<rootDir>/src/config/$1',
    '^@lib(.*)$': '<rootDir>/src/lib/$1',
  },
  verbose: true,
  testTimeout: 300000,
  moduleFileExtensions: ['ts', 'js', 'json'],
  logHeapUsage: true,
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: '0',
      functions: '0',
      lines: '0',
      statements: '0',
    },
  },
};
