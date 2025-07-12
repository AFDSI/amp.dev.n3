// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const pixiConfig = require('./pixi/config.js');

module.exports = {
  clearMocks: true,

  globals: {
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      pixiConfig.development.API_ENDPOINT_PAGE_SPEED_INSIGHTS,
    API_ENDPOINT_LINTER: pixiConfig.development.API_ENDPOINT_LINTER,
    API_ENDPOINT_LINTER_CANARY:
      pixiConfig.development.API_ENDPOINT_LINTER_CANARY,
    API_ENDPOINT_MOBILE_FRIENDLINESS:
      pixiConfig.development.API_ENDPOINT_MOBILE_FRIENDLINESS,
    AMP_DEV_PIXI_APIS_KEY: '',
  },

  moduleNameMapper: {
    '^@lib/utils$': '<rootDir>/platform/lib/utils/index.js',
    '^@lib/(.*?)(.js)?$': '<rootDir>/platform/lib/$1.js',
    '^@examples/(.*?)(.js)?$': '<rootDir>/examples/$1.js',
    '^@examples$': '<rootDir>/examples/index.js',
    '^@boilerplate/(.*?)(.js)?$': '<rootDir>/boilerplate/$1.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/platform/lib/utils/noop.js',
    '\\.(html|hbs|j2|njk)$': '<rootDir>/platform/lib/utils/noop.js',
    // ✅ Explicitly ensure `ws` resolves to node_modules
    '^ws$': require.resolve('ws'),
  },

  // ✅ Don't transform ws — allow raw node_modules version
  transformIgnorePatterns: ['node_modules/(?!(ws)/)'],

  testEnvironment: 'jsdom',

  //   testMatch: [
  //     '**/__tests__/**/*.[jt]s?(x)',
  //     '**/?(*.)+(spec|test|Spec|_spec).[tj]s?(x)',
  //   ],

  testMatch: ['**/smoke-tests/**/*.test.js'],

  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist',
    '<rootDir>/build',
    '<rootDir>/gulpfile.js',
    '<rootDir>/pages/extensions/amp-story-player', // ← ignore nonexistent directory
    '<rootDir>/test/visual-regression', // ← Add any missing dir here
  ],
};
