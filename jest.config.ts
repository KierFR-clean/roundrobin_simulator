// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Needed for React DOM testing
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"], // Finds .test.tsx files
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Optional, see below
};
