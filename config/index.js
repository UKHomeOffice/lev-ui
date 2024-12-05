'use strict';

const packageJson = require('../package.json');

module.exports = {
  MOCK: process.env.MOCK || "false",
  options: {
    port: process.env.PORT || 8001,
    logs: {
      console: true,
      app: 'logs/lev-web-ui.log',
      error: false,
      dateRotate: true,
      maxFiles: 1,
    },
    redis: {
      connectionString: process.env.REDIS_CONNECTION_STRING || undefined,
      host: process.env.REDIS_HOST || undefined,
      port: process.env.REDIS_PORT || undefined
    },
    session: {
      ttl: 660
    }
  },
  api: {
    protocol: process.env.API_PROTOCOL || 'http',
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT || 8080,
    client: process.env.API_KC_CLIENT || packageJson.name,
    username: process.env.API_USER || '',
    rejectUnauthorized: process.env.LEV_TLS_VERIFY !== 'false',
    get baseUrl() {
      return `${this.protocol}://${this.host}:${this.port}`;
    }
  },
  iamApi: {
    protocol: process.env.IAM_API_PROTOCOL || 'http',
    host: process.env.IAM_API_HOST || 'localhost',
    port: process.env.IAM_API_PORT || 8000,
    client: process.env.IAM_API_KC_CLIENT || packageJson.name,
    username: process.env.IAM_USER || '',
    rejectUnauthorized: process.env.LEV_TLS_VERIFY !== 'false',
    get baseUrl() {
      return `${this.protocol}://${this.host}:${this.port}`;
    }
  },
  syops: {
    renewalAfterDays: process.env.SYOPS_RENEWAL_PERIOD_DAYS || 365
  }
};
