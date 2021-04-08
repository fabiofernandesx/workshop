module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  roots: ['src'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleMapper: {
    'src/{.*}': '<rootDir>/src/$1',
  },
}
