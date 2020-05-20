const db = require('../db');

const symbol = Symbol('beidou#context#db');

const Url = require('url');
const _ = require('lodash');

module.exports = {
  get db() {
    if (!this[symbol]) {
      this[symbol] = db;
    }
    return this[symbol];
  },

  get serverUrl() {
    return this.app.config.provider_server;
  },

  getClientIp() {
    return (this.request.headers && this.request.headers['x-real-ip']) ? this.request.headers['x-real-ip'] : this.request.ip;
  },

  provider_getJson(uri, params, options) {
    options = options || {};
    options.method = 'GET';
    this.provider_json(uri, params, options);
  },

  provider_postJson(uri, params, options) {
    options = options || {};
    options.method = 'POST';
    this.provider_json(uri, params, options);
  },

  provider_putJson(uri, params, options) {
    options = options || {};
    options.method = 'PUT';
    this.provider_json(uri, params, options);
  },

  provider_deleteJson(uri, params, options) {
    options = options || {};
    options.method = 'DELETE';
    this.provider_json(uri, params, options);
  },

  provider_json(uri, params, options) {
    const headers = options.headers || {};
    const apiTimeout = options.timeout || this.app.config.apiTimeout;
    if (uri.indexOf('://') === -1) {
      uri = Url.resolve(this.serverUrl, uri);
    }
    params = params || {};
    for (const key in params) {
      if (params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    }
    const _options = {
      timeout: apiTimeout,
      method: options.method,
      dataType: 'json',
      rejectUnauthorized: false,
      headers: _.extend({}, {
        'X-Real-IP': this.getClientIp() || '',
        'X-tyc-Referer': this.path || '',
        'User-Agent': 'node/nodeJsServer NewSkyEyes',
        Authorization: '',
      }, headers),
      data: params || {},
    };
    return this.curl(uri, _options);
  },
};
