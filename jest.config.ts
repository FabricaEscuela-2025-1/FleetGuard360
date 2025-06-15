import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
      dir: './',
});

const customJestConfig: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],

  collectCoverage: true, 
  coverageProvider: 'v8',
  
  collectCoverageFrom: [ 
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
    '!<rootDir>/jest.setup.ts',
    '!<rootDir>/pages/_app.tsx',      
    '!<rootDir>/pages/_document.tsx', 
  ],

  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default createJestConfig(customJestConfig);