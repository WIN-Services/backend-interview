module.exports = {
    preset: 'jest',
    moduleNameMapper: {
      '^~/(.*)$': '<rootDir>/$1',
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '@jest/transform-babel',
    },
    transformIgnorePatterns: [
      '/node_modules/',
    ],
  };
  