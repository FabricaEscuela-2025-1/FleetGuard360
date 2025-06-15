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
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
  preset: 'ts-jest',
};

export default createJestConfig(customJestConfig);