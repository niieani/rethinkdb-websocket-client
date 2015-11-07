'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _rethinkdb = require('rethinkdb');

var _rethinkdb2 = _interopRequireDefault(_rethinkdb);

var _rethinkdbProtoDef = require('rethinkdb/proto-def');

var _rethinkdbProtoDef2 = _interopRequireDefault(_rethinkdbProtoDef);

var _TcpPolyfill = require('./TcpPolyfill');

function connect(_ref) {
  var host = _ref.host;
  var port = _ref.port;
  var path = _ref.path;
  var secure = _ref.secure;
  var wsProtocols = _ref.wsProtocols;
  var db = _ref.db;
  var simulatedLatencyMs = _ref.simulatedLatencyMs;

  (0, _TcpPolyfill.configureTcpPolyfill)({ path: path, secure: secure, wsProtocols: wsProtocols, simulatedLatencyMs: simulatedLatencyMs });
  // Temporarily unset process.browser so rethinkdb uses a TcpConnection
  var oldProcessDotBrowser = process.browser;
  process.browser = false;
  var connectOptions = { host: host, port: port, db: db };
  var connectionPromise = _bluebird2['default'].promisify(_rethinkdb2['default'].connect)(connectOptions);
  process.browser = oldProcessDotBrowser;
  return connectionPromise;
}

var RethinkdbWebsocketClient = {
  rethinkdb: _rethinkdb2['default'],
  protodef: _rethinkdbProtoDef2['default'],
  Promise: _bluebird2['default'],
  connect: connect
};

exports.rethinkdb = _rethinkdb2['default'];
exports.protodef = _rethinkdbProtoDef2['default'];
exports.Promise = _bluebird2['default'];
exports.connect = connect;
exports['default'] = RethinkdbWebsocketClient;