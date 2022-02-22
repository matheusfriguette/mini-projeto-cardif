module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: ["/node_modules/(?!ngx-barcode|jsdom).+\\.js$"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "src/app/*.{js}"],
  collectCoverage: true,
  coverageDirectory: "jest-coverage",
  coverageReporters: ["html"],
  modulePaths: ["<rootDir>"],
};
