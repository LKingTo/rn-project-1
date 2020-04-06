
/**
 * React Native Debugger 工具调试 MobX 需要借助 mobx-remotedev 工具
 * 原版 [mobx-remotedev](https://github.com/zalmoxisus/mobx-remotedev) 并不支持 MobX4
 * 有网友 fork 了一份，改造成支持 MobX4 的，但是并没有发布到 npm
 * 因此直接 clone 其源代码(https://github.com/crayonzx/mobx-remotedev)，本地 build 了一份
 *
 * 此工具仅在开发环境有效 process.env.NODE_ENV === 'development'
 * 生产环境将自动 strip
 */
// todo

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobx"));
	else if(typeof define === 'function' && define.amd)
		define(["mobx"], factory);
	else if(typeof exports === 'object')
		exports["RemoteDev"] = factory(require("mobx"));
	else
		root["RemoteDev"] = factory(root["mobx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _getDecorator = __webpack_require__(5);

	var _getDecorator2 = _interopRequireDefault(_getDecorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (true) {
	  module.exports = __webpack_require__(15).default; // eslint-disable-line global-require
	} else {
	  module.exports = (0, _getDecorator2.default)(function (store) {
	    return store;
	  });
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var decycle = __webpack_require__(41);

	var isStrict = (function () { return !this; })();

	function AuthTokenExpiredError(message, expiry) {
	  this.name = 'AuthTokenExpiredError';
	  this.message = message;
	  this.expiry = expiry;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	AuthTokenExpiredError.prototype = Object.create(Error.prototype);


	function AuthTokenInvalidError(message) {
	  this.name = 'AuthTokenInvalidError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	AuthTokenInvalidError.prototype = Object.create(Error.prototype);


	function AuthTokenNotBeforeError(message, date) {
	  this.name = 'AuthTokenNotBeforeError';
	  this.message = message;
	  this.date = date;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	AuthTokenNotBeforeError.prototype = Object.create(Error.prototype);


	// For any other auth token error.
	function AuthTokenError(message) {
	  this.name = 'AuthTokenError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	AuthTokenError.prototype = Object.create(Error.prototype);


	function SilentMiddlewareBlockedError(message, type) {
	  this.name = 'SilentMiddlewareBlockedError';
	  this.message = message;
	  this.type = type;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	SilentMiddlewareBlockedError.prototype = Object.create(Error.prototype);


	function InvalidActionError(message) {
	  this.name = 'InvalidActionError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	InvalidActionError.prototype = Object.create(Error.prototype);

	function InvalidArgumentsError(message) {
	  this.name = 'InvalidArgumentsError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	InvalidArgumentsError.prototype = Object.create(Error.prototype);

	function InvalidOptionsError(message) {
	  this.name = 'InvalidOptionsError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	InvalidOptionsError.prototype = Object.create(Error.prototype);


	function InvalidMessageError(message) {
	  this.name = 'InvalidMessageError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	InvalidMessageError.prototype = Object.create(Error.prototype);


	function SocketProtocolError(message, code) {
	  this.name = 'SocketProtocolError';
	  this.message = message;
	  this.code = code;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	SocketProtocolError.prototype = Object.create(Error.prototype);


	function ServerProtocolError(message) {
	  this.name = 'ServerProtocolError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	ServerProtocolError.prototype = Object.create(Error.prototype);

	function HTTPServerError(message) {
	  this.name = 'HTTPServerError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	HTTPServerError.prototype = Object.create(Error.prototype);


	function ResourceLimitError(message) {
	  this.name = 'ResourceLimitError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	ResourceLimitError.prototype = Object.create(Error.prototype);


	function TimeoutError(message) {
	  this.name = 'TimeoutError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	TimeoutError.prototype = Object.create(Error.prototype);


	function BadConnectionError(message, type) {
	  this.name = 'BadConnectionError';
	  this.message = message;
	  this.type = type;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	BadConnectionError.prototype = Object.create(Error.prototype);


	function BrokerError(message) {
	  this.name = 'BrokerError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	BrokerError.prototype = Object.create(Error.prototype);


	function ProcessExitError(message, code) {
	  this.name = 'ProcessExitError';
	  this.message = message;
	  this.code = code;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	ProcessExitError.prototype = Object.create(Error.prototype);


	function UnknownError(message) {
	  this.name = 'UnknownError';
	  this.message = message;
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	}
	UnknownError.prototype = Object.create(Error.prototype);


	// Expose all error types.

	module.exports = {
	  AuthTokenExpiredError: AuthTokenExpiredError,
	  AuthTokenInvalidError: AuthTokenInvalidError,
	  AuthTokenNotBeforeError: AuthTokenNotBeforeError,
	  AuthTokenError: AuthTokenError,
	  SilentMiddlewareBlockedError: SilentMiddlewareBlockedError,
	  InvalidActionError: InvalidActionError,
	  InvalidArgumentsError: InvalidArgumentsError,
	  InvalidOptionsError: InvalidOptionsError,
	  InvalidMessageError: InvalidMessageError,
	  SocketProtocolError: SocketProtocolError,
	  ServerProtocolError: ServerProtocolError,
	  HTTPServerError: HTTPServerError,
	  ResourceLimitError: ResourceLimitError,
	  TimeoutError: TimeoutError,
	  BadConnectionError: BadConnectionError,
	  BrokerError: BrokerError,
	  ProcessExitError: ProcessExitError,
	  UnknownError: UnknownError
	};

	module.exports.socketProtocolErrorStatuses = {
	  1001: 'Socket was disconnected',
	  1002: 'A WebSocket protocol error was encountered',
	  1003: 'Server terminated socket because it received invalid data',
	  1005: 'Socket closed without status code',
	  1006: 'Socket hung up',
	  1007: 'Message format was incorrect',
	  1008: 'Encountered a policy violation',
	  1009: 'Message was too big to process',
	  1010: 'Client ended the connection because the server did not comply with extension requirements',
	  1011: 'Server encountered an unexpected fatal condition',
	  4000: 'Server ping timed out',
	  4001: 'Client pong timed out',
	  4002: 'Server failed to sign auth token',
	  4003: 'Failed to complete handshake',
	  4004: 'Client failed to save auth token',
	  4005: 'Did not receive #handshake from client before timeout',
	  4006: 'Failed to bind socket to message broker',
	  4007: 'Client connection establishment timed out',
	  4008: 'Server rejected handshake from client'
	};

	module.exports.socketProtocolIgnoreStatuses = {
	  1000: 'Socket closed normally',
	  1001: 'Socket hung up'
	};

	// Properties related to error domains cannot be serialized.
	var unserializableErrorProperties = {
	  domain: 1,
	  domainEmitter: 1,
	  domainThrown: 1
	};

	// Convert an error into a JSON-compatible type which can later be hydrated
	// back to its *original* form.
	module.exports.dehydrateError = function dehydrateError(error, includeStackTrace) {
	  var dehydratedError;

	  if (error && typeof error === 'object') {
	    dehydratedError = {
	      message: error.message
	    };
	    if (includeStackTrace) {
	      dehydratedError.stack = error.stack;
	    }
	    for (var i in error) {
	      if (!unserializableErrorProperties[i]) {
	        dehydratedError[i] = error[i];
	      }
	    }
	  } else if (typeof error === 'function') {
	    dehydratedError = '[function ' + (error.name || 'anonymous') + ']';
	  } else {
	    dehydratedError = error;
	  }

	  return decycle(dehydratedError);
	};

	// Convert a dehydrated error back to its *original* form.
	module.exports.hydrateError = function hydrateError(error) {
	  var hydratedError = null;
	  if (error != null) {
	    if (typeof error === 'object') {
	      hydratedError = new Error(error.message);
	      for (var i in error) {
	        if (error.hasOwnProperty(i)) {
	          hydratedError[i] = error[i];
	        }
	      }
	    } else {
	      hydratedError = error;
	    }
	  }
	  return hydratedError;
	};

	module.exports.decycle = decycle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = getDecorator;

	var _mobx = __webpack_require__(1);

	var mobx = _interopRequireWildcard(_mobx);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function getDecorator(func) {
	  return function (storeOrConfig, config) {
	    if ((typeof storeOrConfig === 'undefined' ? 'undefined' : _typeof(storeOrConfig)) === 'object' && !mobx.isObservable(storeOrConfig)) {
	      return function (store) {
	        return func(store, storeOrConfig);
	      };
	    }
	    return func(storeOrConfig, config);
	  };
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.setValue = exports.silently = undefined;
	exports.createAction = createAction;
	exports.getName = getName;

	var _mobx = __webpack_require__(1);

	var mobx = _interopRequireWildcard(_mobx);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var getPayload = function getPayload(change) {
	  var added = change.added,
	      addedCount = change.addedCount,
	      index = change.index,
	      removed = change.removed,
	      removedCount = change.removedCount;

	  return {
	    index: index,
	    added: added && mobx.toJS(added),
	    addedCount: addedCount,
	    removed: removed && mobx.toJS(removed),
	    removedCount: removedCount
	  };
	};

	function createAction(name, change) {
	  if (!change) {
	    // is action
	    return { type: name };
	  }

	  var action = void 0;
	  if (typeof change.newValue !== 'undefined') {
	    var _action;

	    var key = typeof change.index !== 'undefined' ? change.index : change.name;
	    action = (_action = {}, _action[key] = mobx.toJS(change.newValue), _action);
	  } else {
	    action = getPayload(change);
	  }
	  action.type = '\u2503 ' + name;

	  return action;
	}

	function getName(obj) {
	  if (!obj || !mobx.isObservable(obj)) return '';
	  var r = mobx.getDebugName(obj);
	  var end = r.indexOf('.');
	  if (end === -1) end = undefined;
	  return r.substr(0, end);
	}

	/* eslint-disable no-param-reassign */
	var silently = exports.silently = function silently(fn, store) {
	  store.__isRemotedevAction = true;
	  fn();
	  delete store.__isRemotedevAction;
	};

	function setValueAction(store, state) {
	  silently(function () {
	    if (store.importState) {
	      store.importState(state);
	    } else {
	      Object.keys(state).forEach(function (key) {
	        store[key] = state[key];
	      });
	    }
	  }, store);
	  return state;
	}
	setValueAction.__isRemotedevAction = true;
	var setValue = exports.setValue = mobx.action('@@remotedev', setValueAction);
	/* eslint-enable */

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(20)
	var ieee754 = __webpack_require__(23)
	var isArray = __webpack_require__(24)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var cycle = __webpack_require__(25);

	exports.stringify = function stringify(value, replacer, space, _options) {

	  if (arguments.length < 4) {
	    try {
	      if (arguments.length === 1) {
	        return JSON.stringify(value);
	      } else {
	        return JSON.stringify.apply(JSON, arguments);
	      }
	    } catch (e) {}
	  }

	  var options = _options || false;
	  if (typeof options === 'boolean') {
	    options = {
	      'date': options,
	      'function': options,
	      'regex': options,
	      'undefined': options,
	      'error': options,
	      'symbol': options,
	      'map': options,
	      'set': options,
	      'nan': options,
	      'infinity': options
	    }
	  }

	  var decycled = cycle.decycle(value, options, replacer);
	  if (arguments.length === 1) {
	    return JSON.stringify(decycled);
	  } else {
	    // decycle already handles when replacer is a function.
	    return JSON.stringify(decycled, Array.isArray(replacer) ? replacer : null, space);
	  }
	}

	exports.parse = function parse(text, reviver) {
	  var needsRetrocycle = /"\$jsan"/.test(text);
	  var parsed;
	  if (arguments.length === 1) {
	    parsed = JSON.parse(text);
	  } else {
	    parsed = JSON.parse(text, reviver);
	  }
	  if (needsRetrocycle) {
	    parsed = cycle.retrocycle(parsed);
	  }
	  return parsed;
	}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = pathGetter;

	function pathGetter(obj, path) {
	  if (path !== '$') {
	    var paths = getPaths(path);
	    for (var i = 0; i < paths.length; i++) {
	      path = paths[i].toString().replace(/\\"/g, '"');
	      if (typeof obj[path] === 'undefined' && i !== paths.length - 1) continue;
	      obj = obj[path];
	    }
	  }
	  return obj;
	}

	function getPaths(pathString) {
	  var regex = /(?:\.(\w+))|(?:\[(\d+)\])|(?:\["((?:[^\\"]|\\.)*)"\])/g;
	  var matches = [];
	  var match;
	  while (match = regex.exec(pathString)) {
	    matches.push( match[1] || match[2] || match[3] );
	  }
	  return matches;
	}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(30);
	exports.encode = exports.stringify = __webpack_require__(31);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var scErrors = __webpack_require__(3);
	var InvalidActionError = scErrors.InvalidActionError;

	var Response = function (socket, id) {
	  this.socket = socket;
	  this.id = id;
	  this.sent = false;
	};

	Response.prototype._respond = function (responseData) {
	  if (this.sent) {
	    throw new InvalidActionError('Response ' + this.id + ' has already been sent');
	  } else {
	    this.sent = true;
	    this.socket.send(this.socket.encode(responseData));
	  }
	};

	Response.prototype.end = function (data) {
	  if (this.id) {
	    var responseData = {
	      rid: this.id
	    };
	    if (data !== undefined) {
	      responseData.data = data;
	    }
	    this._respond(responseData);
	  }
	};

	Response.prototype.error = function (error, data) {
	  if (this.id) {
	    var err = scErrors.dehydrateError(error);

	    var responseData = {
	      rid: this.id,
	      error: err
	    };
	    if (data !== undefined) {
	      responseData.data = data;
	    }

	    this._respond(responseData);
	  }
	};

	Response.prototype.callback = function (error, data) {
	  if (error) {
	    this.error(error, data);
	  } else {
	    this.end(data);
	  }
	};

	module.exports.Response = Response;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {var Emitter = __webpack_require__(2);
	var SCChannel = __webpack_require__(40).SCChannel;
	var Response = __webpack_require__(11).Response;
	var AuthEngine = __webpack_require__(44).AuthEngine;
	var formatter = __webpack_require__(42);
	var SCTransport = __webpack_require__(46).SCTransport;
	var querystring = __webpack_require__(10);
	var LinkedList = __webpack_require__(28);
	var base64 = __webpack_require__(19);
	var clone = __webpack_require__(21);

	var scErrors = __webpack_require__(3);
	var InvalidArgumentsError = scErrors.InvalidArgumentsError;
	var InvalidMessageError = scErrors.InvalidMessageError;
	var InvalidActionError = scErrors.InvalidActionError;
	var SocketProtocolError = scErrors.SocketProtocolError;
	var TimeoutError = scErrors.TimeoutError;
	var BadConnectionError = scErrors.BadConnectionError;

	var isBrowser = typeof window != 'undefined';


	var SCClientSocket = function (opts) {
	  var self = this;

	  Emitter.call(this);

	  this.id = null;
	  this.state = this.CLOSED;
	  this.authState = this.UNAUTHENTICATED;
	  this.signedAuthToken = null;
	  this.authToken = null;
	  this.pendingReconnect = false;
	  this.pendingReconnectTimeout = null;
	  this.preparingPendingSubscriptions = false;
	  this.clientId = opts.clientId;

	  this.connectTimeout = opts.connectTimeout;
	  this.ackTimeout = opts.ackTimeout;
	  this.channelPrefix = opts.channelPrefix || null;
	  this.disconnectOnUnload = opts.disconnectOnUnload == null ? true : opts.disconnectOnUnload;
	  this.authTokenName = opts.authTokenName;

	  // pingTimeout will be ackTimeout at the start, but it will
	  // be updated with values provided by the 'connect' event
	  this.pingTimeout = this.ackTimeout;
	  this.pingTimeoutDisabled = !!opts.pingTimeoutDisabled;
	  this.active = true;

	  this._clientMap = opts.clientMap || {};

	  var maxTimeout = Math.pow(2, 31) - 1;

	  var verifyDuration = function (propertyName) {
	    if (self[propertyName] > maxTimeout) {
	      throw new InvalidArgumentsError('The ' + propertyName +
	        ' value provided exceeded the maximum amount allowed');
	    }
	  };

	  verifyDuration('connectTimeout');
	  verifyDuration('ackTimeout');

	  this._localEvents = {
	    'connect': 1,
	    'connectAbort': 1,
	    'close': 1,
	    'disconnect': 1,
	    'message': 1,
	    'error': 1,
	    'raw': 1,
	    'kickOut': 1,
	    'subscribe': 1,
	    'unsubscribe': 1,
	    'subscribeStateChange': 1,
	    'authStateChange': 1,
	    'authenticate': 1,
	    'deauthenticate': 1,
	    'removeAuthToken': 1,
	    'subscribeRequest': 1
	  };

	  this.connectAttempts = 0;

	  this._emitBuffer = new LinkedList();
	  this.channels = {};

	  this.options = opts;

	  this._cid = 1;

	  this.options.callIdGenerator = function () {
	    return self._cid++;
	  };

	  if (this.options.autoReconnect) {
	    if (this.options.autoReconnectOptions == null) {
	      this.options.autoReconnectOptions = {};
	    }

	    // Add properties to the this.options.autoReconnectOptions object.
	    // We assign the reference to a reconnectOptions variable to avoid repetition.
	    var reconnectOptions = this.options.autoReconnectOptions;
	    if (reconnectOptions.initialDelay == null) {
	      reconnectOptions.initialDelay = 10000;
	    }
	    if (reconnectOptions.randomness == null) {
	      reconnectOptions.randomness = 10000;
	    }
	    if (reconnectOptions.multiplier == null) {
	      reconnectOptions.multiplier = 1.5;
	    }
	    if (reconnectOptions.maxDelay == null) {
	      reconnectOptions.maxDelay = 60000;
	    }
	  }

	  if (this.options.subscriptionRetryOptions == null) {
	    this.options.subscriptionRetryOptions = {};
	  }

	  if (this.options.authEngine) {
	    this.auth = this.options.authEngine;
	  } else {
	    this.auth = new AuthEngine();
	  }

	  if (this.options.codecEngine) {
	    this.codec = this.options.codecEngine;
	  } else {
	    // Default codec engine
	    this.codec = formatter;
	  }

	  this.options.path = this.options.path.replace(/\/$/, '') + '/';

	  this.options.query = opts.query || {};
	  if (typeof this.options.query == 'string') {
	    this.options.query = querystring.parse(this.options.query);
	  }

	  this._channelEmitter = new Emitter();

	  this._unloadHandler = function () {
	    self.disconnect();
	  };

	  if (isBrowser && this.disconnectOnUnload && global.addEventListener) {
	    global.addEventListener('beforeunload', this._unloadHandler, false);
	  }
	  this._clientMap[this.clientId] = this;

	  if (this.options.autoConnect) {
	    this.connect();
	  }
	};

	SCClientSocket.prototype = Object.create(Emitter.prototype);

	SCClientSocket.CONNECTING = SCClientSocket.prototype.CONNECTING = SCTransport.prototype.CONNECTING;
	SCClientSocket.OPEN = SCClientSocket.prototype.OPEN = SCTransport.prototype.OPEN;
	SCClientSocket.CLOSED = SCClientSocket.prototype.CLOSED = SCTransport.prototype.CLOSED;

	SCClientSocket.AUTHENTICATED = SCClientSocket.prototype.AUTHENTICATED = 'authenticated';
	SCClientSocket.UNAUTHENTICATED = SCClientSocket.prototype.UNAUTHENTICATED = 'unauthenticated';

	SCClientSocket.PENDING = SCClientSocket.prototype.PENDING = 'pending';

	SCClientSocket.ignoreStatuses = scErrors.socketProtocolIgnoreStatuses;
	SCClientSocket.errorStatuses = scErrors.socketProtocolErrorStatuses;

	SCClientSocket.prototype._privateEventHandlerMap = {
	  '#publish': function (data) {
	    var undecoratedChannelName = this._undecorateChannelName(data.channel);
	    var isSubscribed = this.isSubscribed(undecoratedChannelName, true);

	    if (isSubscribed) {
	      this._channelEmitter.emit(undecoratedChannelName, data.data);
	    }
	  },
	  '#kickOut': function (data) {
	    var undecoratedChannelName = this._undecorateChannelName(data.channel);
	    var channel = this.channels[undecoratedChannelName];
	    if (channel) {
	      Emitter.prototype.emit.call(this, 'kickOut', data.message, undecoratedChannelName);
	      channel.emit('kickOut', data.message, undecoratedChannelName);
	      this._triggerChannelUnsubscribe(channel);
	    }
	  },
	  '#setAuthToken': function (data, response) {
	    var self = this;

	    if (data) {
	      var triggerAuthenticate = function (err) {
	        if (err) {
	          // This is a non-fatal error, we don't want to close the connection
	          // because of this but we do want to notify the server and throw an error
	          // on the client.
	          response.error(err);
	          self._onSCError(err);
	        } else {
	          self._changeToAuthenticatedState(data.token);
	          response.end();
	        }
	      };

	      this.auth.saveToken(this.authTokenName, data.token, {}, triggerAuthenticate);
	    } else {
	      response.error(new InvalidMessageError('No token data provided by #setAuthToken event'));
	    }
	  },
	  '#removeAuthToken': function (data, response) {
	    var self = this;

	    this.auth.removeToken(this.authTokenName, function (err, oldToken) {
	      if (err) {
	        // Non-fatal error - Do not close the connection
	        response.error(err);
	        self._onSCError(err);
	      } else {
	        Emitter.prototype.emit.call(self, 'removeAuthToken', oldToken);
	        self._changeToUnauthenticatedStateAndClearTokens();
	        response.end();
	      }
	    });
	  },
	  '#disconnect': function (data) {
	    this.transport.close(data.code, data.data);
	  }
	};

	SCClientSocket.prototype.getState = function () {
	  return this.state;
	};

	SCClientSocket.prototype.getBytesReceived = function () {
	  return this.transport.getBytesReceived();
	};

	SCClientSocket.prototype.deauthenticate = function (callback) {
	  var self = this;

	  this.auth.removeToken(this.authTokenName, function (err, oldToken) {
	    if (err) {
	      // Non-fatal error - Do not close the connection
	      self._onSCError(err);
	    } else {
	      Emitter.prototype.emit.call(self, 'removeAuthToken', oldToken);
	      if (self.state != self.CLOSED) {
	        self.emit('#removeAuthToken');
	      }
	      self._changeToUnauthenticatedStateAndClearTokens();
	    }
	    callback && callback(err);
	  });
	};

	SCClientSocket.prototype.connect = SCClientSocket.prototype.open = function () {
	  var self = this;

	  if (!this.active) {
	    var error = new InvalidActionError('Cannot connect a destroyed client');
	    this._onSCError(error);
	    return;
	  }

	  if (this.state == this.CLOSED) {
	    this.pendingReconnect = false;
	    this.pendingReconnectTimeout = null;
	    clearTimeout(this._reconnectTimeoutRef);

	    this.state = this.CONNECTING;
	    Emitter.prototype.emit.call(this, 'connecting');

	    if (this.transport) {
	      this.transport.off();
	    }

	    this.transport = new SCTransport(this.auth, this.codec, this.options);

	    this.transport.on('open', function (status) {
	      self.state = self.OPEN;
	      self._onSCOpen(status);
	    });

	    this.transport.on('error', function (err) {
	      self._onSCError(err);
	    });

	    this.transport.on('close', function (code, data) {
	      self.state = self.CLOSED;
	      self._onSCClose(code, data);
	    });

	    this.transport.on('openAbort', function (code, data) {
	      self.state = self.CLOSED;
	      self._onSCClose(code, data, true);
	    });

	    this.transport.on('event', function (event, data, res) {
	      self._onSCEvent(event, data, res);
	    });
	  }
	};

	SCClientSocket.prototype.reconnect = function (code, data) {
	  this.disconnect(code, data);
	  this.connect();
	};

	SCClientSocket.prototype.disconnect = function (code, data) {
	  code = code || 1000;

	  if (typeof code != 'number') {
	    throw new InvalidArgumentsError('If specified, the code argument must be a number');
	  }

	  if (this.state == this.OPEN || this.state == this.CONNECTING) {
	    this.transport.close(code, data);
	  } else {
	    this.pendingReconnect = false;
	    this.pendingReconnectTimeout = null;
	    clearTimeout(this._reconnectTimeoutRef);
	  }
	};

	SCClientSocket.prototype.destroy = function (code, data) {
	  if (isBrowser && global.removeEventListener) {
	    global.removeEventListener('beforeunload', this._unloadHandler, false);
	  }
	  this.active = false;
	  this.disconnect(code, data);
	  delete this._clientMap[this.clientId];
	};

	SCClientSocket.prototype._changeToUnauthenticatedStateAndClearTokens = function () {
	  if (this.authState != this.UNAUTHENTICATED) {
	    var oldState = this.authState;
	    var oldSignedToken = this.signedAuthToken;
	    this.authState = this.UNAUTHENTICATED;
	    this.signedAuthToken = null;
	    this.authToken = null;

	    var stateChangeData = {
	      oldState: oldState,
	      newState: this.authState
	    };
	    Emitter.prototype.emit.call(this, 'authStateChange', stateChangeData);
	    Emitter.prototype.emit.call(this, 'deauthenticate', oldSignedToken);
	  }
	};

	SCClientSocket.prototype._changeToAuthenticatedState = function (signedAuthToken) {
	  this.signedAuthToken = signedAuthToken;
	  this.authToken = this._extractAuthTokenData(signedAuthToken);

	  if (this.authState != this.AUTHENTICATED) {
	    var oldState = this.authState;
	    this.authState = this.AUTHENTICATED;
	    var stateChangeData = {
	      oldState: oldState,
	      newState: this.authState,
	      signedAuthToken: signedAuthToken,
	      authToken: this.authToken
	    };
	    if (!this.preparingPendingSubscriptions) {
	      this.processPendingSubscriptions();
	    }

	    Emitter.prototype.emit.call(this, 'authStateChange', stateChangeData);
	  }
	  Emitter.prototype.emit.call(this, 'authenticate', signedAuthToken);
	};

	SCClientSocket.prototype.decodeBase64 = function (encodedString) {
	  var decodedString;
	  if (typeof Buffer == 'undefined') {
	    if (global.atob) {
	      decodedString = global.atob(encodedString);
	    } else {
	      decodedString = base64.decode(encodedString);
	    }
	  } else {
	    var buffer = new Buffer(encodedString, 'base64');
	    decodedString = buffer.toString('utf8');
	  }
	  return decodedString;
	};

	SCClientSocket.prototype.encodeBase64 = function (decodedString) {
	  var encodedString;
	  if (typeof Buffer == 'undefined') {
	    if (global.btoa) {
	      encodedString = global.btoa(decodedString);
	    } else {
	      encodedString = base64.encode(decodedString);
	    }
	  } else {
	    var buffer = new Buffer(decodedString, 'utf8');
	    encodedString = buffer.toString('base64');
	  }
	  return encodedString;
	};

	SCClientSocket.prototype._extractAuthTokenData = function (signedAuthToken) {
	  var tokenParts = (signedAuthToken || '').split('.');
	  var encodedTokenData = tokenParts[1];
	  if (encodedTokenData != null) {
	    var tokenData = encodedTokenData;
	    try {
	      tokenData = this.decodeBase64(tokenData);
	      return JSON.parse(tokenData);
	    } catch (e) {
	      return tokenData;
	    }
	  }
	  return null;
	};

	SCClientSocket.prototype.getAuthToken = function () {
	  return this.authToken;
	};

	SCClientSocket.prototype.getSignedAuthToken = function () {
	  return this.signedAuthToken;
	};

	// Perform client-initiated authentication by providing an encrypted token string.
	SCClientSocket.prototype.authenticate = function (signedAuthToken, callback) {
	  var self = this;

	  this.emit('#authenticate', signedAuthToken, function (err, authStatus) {
	    if (authStatus && authStatus.isAuthenticated != null) {
	      // If authStatus is correctly formatted (has an isAuthenticated property),
	      // then we will rehydrate the authError.
	      if (authStatus.authError) {
	        authStatus.authError = scErrors.hydrateError(authStatus.authError);
	      }
	    } else {
	      // Some errors like BadConnectionError and TimeoutError will not pass a valid
	      // authStatus object to the current function, so we need to create it ourselves.
	      authStatus = {
	        isAuthenticated: self.authState,
	        authError: null
	      };
	    }
	    if (err) {
	      if (err.name != 'BadConnectionError' && err.name != 'TimeoutError') {
	        // In case of a bad/closed connection or a timeout, we maintain the last
	        // known auth state since those errors don't mean that the token is invalid.

	        self._changeToUnauthenticatedStateAndClearTokens();
	      }
	      callback && callback(err, authStatus);
	    } else {
	      self.auth.saveToken(self.authTokenName, signedAuthToken, {}, function (err) {
	        if (err) {
	          self._onSCError(err);
	        }
	        if (authStatus.isAuthenticated) {
	          self._changeToAuthenticatedState(signedAuthToken);
	        } else {
	          self._changeToUnauthenticatedStateAndClearTokens();
	        }
	        callback && callback(err, authStatus);
	      });
	    }
	  });
	};

	SCClientSocket.prototype._tryReconnect = function (initialDelay) {
	  var self = this;

	  var exponent = this.connectAttempts++;
	  var reconnectOptions = this.options.autoReconnectOptions;
	  var timeout;

	  if (initialDelay == null || exponent > 0) {
	    var initialTimeout = Math.round(reconnectOptions.initialDelay + (reconnectOptions.randomness || 0) * Math.random());

	    timeout = Math.round(initialTimeout * Math.pow(reconnectOptions.multiplier, exponent));
	  } else {
	    timeout = initialDelay;
	  }

	  if (timeout > reconnectOptions.maxDelay) {
	    timeout = reconnectOptions.maxDelay;
	  }

	  clearTimeout(this._reconnectTimeoutRef);

	  this.pendingReconnect = true;
	  this.pendingReconnectTimeout = timeout;
	  this._reconnectTimeoutRef = setTimeout(function () {
	    self.connect();
	  }, timeout);
	};

	SCClientSocket.prototype._onSCOpen = function (status) {
	  var self = this;

	  this.preparingPendingSubscriptions = true;

	  if (status) {
	    this.id = status.id;
	    this.pingTimeout = status.pingTimeout;
	    this.transport.pingTimeout = this.pingTimeout;
	    if (status.isAuthenticated) {
	      this._changeToAuthenticatedState(status.authToken);
	    } else {
	      this._changeToUnauthenticatedStateAndClearTokens();
	    }
	  } else {
	    // This can happen if auth.loadToken (in sctransport.js) fails with
	    // an error - This means that the signedAuthToken cannot be loaded by
	    // the auth engine and therefore, we need to unauthenticate the client.
	    this._changeToUnauthenticatedStateAndClearTokens();
	  }

	  this.connectAttempts = 0;

	  if (this.options.autoSubscribeOnConnect) {
	    this.processPendingSubscriptions();
	  }

	  // If the user invokes the callback while in autoSubscribeOnConnect mode, it
	  // won't break anything.
	  Emitter.prototype.emit.call(this, 'connect', status, function () {
	    self.processPendingSubscriptions();
	  });

	  if (this.state == this.OPEN) {
	    this._flushEmitBuffer();
	  }
	};

	SCClientSocket.prototype._onSCError = function (err) {
	  var self = this;

	  // Throw error in different stack frame so that error handling
	  // cannot interfere with a reconnect action.
	  setTimeout(function () {
	    if (self.listeners('error').length < 1) {
	      throw err;
	    } else {
	      Emitter.prototype.emit.call(self, 'error', err);
	    }
	  }, 0);
	};

	SCClientSocket.prototype._suspendSubscriptions = function () {
	  var channel, newState;
	  for (var channelName in this.channels) {
	    if (this.channels.hasOwnProperty(channelName)) {
	      channel = this.channels[channelName];
	      if (channel.state == channel.SUBSCRIBED ||
	        channel.state == channel.PENDING) {

	        newState = channel.PENDING;
	      } else {
	        newState = channel.UNSUBSCRIBED;
	      }

	      this._triggerChannelUnsubscribe(channel, newState);
	    }
	  }
	};

	SCClientSocket.prototype._abortAllPendingEventsDueToBadConnection = function (failureType) {
	  var currentNode = this._emitBuffer.head;
	  var nextNode;

	  while (currentNode) {
	    nextNode = currentNode.next;
	    var eventObject = currentNode.data;
	    clearTimeout(eventObject.timeout);
	    delete eventObject.timeout;
	    currentNode.detach();
	    currentNode = nextNode;

	    var callback = eventObject.callback;
	    if (callback) {
	      delete eventObject.callback;
	      var errorMessage = "Event '" + eventObject.event +
	        "' was aborted due to a bad connection";
	      var error = new BadConnectionError(errorMessage, failureType);
	      callback.call(eventObject, error, eventObject);
	    }
	    // Cleanup any pending response callback in the transport layer too.
	    if (eventObject.cid) {
	      this.transport.cancelPendingResponse(eventObject.cid);
	    }
	  }
	};

	SCClientSocket.prototype._onSCClose = function (code, data, openAbort) {
	  var self = this;

	  this.id = null;

	  if (this.transport) {
	    this.transport.off();
	  }
	  this.pendingReconnect = false;
	  this.pendingReconnectTimeout = null;
	  clearTimeout(this._reconnectTimeoutRef);

	  this._suspendSubscriptions();
	  this._abortAllPendingEventsDueToBadConnection(openAbort ? 'connectAbort' : 'disconnect');

	  // Try to reconnect
	  // on server ping timeout (4000)
	  // or on client pong timeout (4001)
	  // or on close without status (1005)
	  // or on handshake failure (4003)
	  // or on handshake rejection (4008)
	  // or on socket hung up (1006)
	  if (this.options.autoReconnect) {
	    if (code == 4000 || code == 4001 || code == 1005) {
	      // If there is a ping or pong timeout or socket closes without
	      // status, don't wait before trying to reconnect - These could happen
	      // if the client wakes up after a period of inactivity and in this case we
	      // want to re-establish the connection as soon as possible.
	      this._tryReconnect(0);

	      // Codes 4500 and above will be treated as permanent disconnects.
	      // Socket will not try to auto-reconnect.
	    } else if (code != 1000 && code < 4500) {
	      this._tryReconnect();
	    }
	  }

	  if (openAbort) {
	    Emitter.prototype.emit.call(self, 'connectAbort', code, data);
	  } else {
	    Emitter.prototype.emit.call(self, 'disconnect', code, data);
	  }
	  Emitter.prototype.emit.call(self, 'close', code, data);

	  if (!SCClientSocket.ignoreStatuses[code]) {
	    var closeMessage;
	    if (data) {
	      closeMessage = 'Socket connection closed with status code ' + code + ' and reason: ' + data;
	    } else {
	      closeMessage = 'Socket connection closed with status code ' + code;
	    }
	    var err = new SocketProtocolError(SCClientSocket.errorStatuses[code] || closeMessage, code);
	    this._onSCError(err);
	  }
	};

	SCClientSocket.prototype._onSCEvent = function (event, data, res) {
	  var handler = this._privateEventHandlerMap[event];
	  if (handler) {
	    handler.call(this, data, res);
	  } else {
	    Emitter.prototype.emit.call(this, event, data, function () {
	      res && res.callback.apply(res, arguments);
	    });
	  }
	};

	SCClientSocket.prototype.decode = function (message) {
	  return this.transport.decode(message);
	};

	SCClientSocket.prototype.encode = function (object) {
	  return this.transport.encode(object);
	};

	SCClientSocket.prototype._flushEmitBuffer = function () {
	  var currentNode = this._emitBuffer.head;
	  var nextNode;

	  while (currentNode) {
	    nextNode = currentNode.next;
	    var eventObject = currentNode.data;
	    currentNode.detach();
	    this.transport.emitObject(eventObject);
	    currentNode = nextNode;
	  }
	};

	SCClientSocket.prototype._handleEventAckTimeout = function (eventObject, eventNode) {
	  if (eventNode) {
	    eventNode.detach();
	  }
	  delete eventObject.timeout;

	  var callback = eventObject.callback;
	  if (callback) {
	    delete eventObject.callback;
	    var error = new TimeoutError("Event response for '" + eventObject.event + "' timed out");
	    callback.call(eventObject, error, eventObject);
	  }
	  // Cleanup any pending response callback in the transport layer too.
	  if (eventObject.cid) {
	    this.transport.cancelPendingResponse(eventObject.cid);
	  }
	};

	SCClientSocket.prototype._emit = function (event, data, callback) {
	  var self = this;

	  if (this.state == this.CLOSED) {
	    this.connect();
	  }
	  var eventObject = {
	    event: event,
	    callback: callback
	  };

	  var eventNode = new LinkedList.Item();

	  if (this.options.cloneData) {
	    eventObject.data = clone(data);
	  } else {
	    eventObject.data = data;
	  }
	  eventNode.data = eventObject;

	  eventObject.timeout = setTimeout(function () {
	    self._handleEventAckTimeout(eventObject, eventNode);
	  }, this.ackTimeout);

	  this._emitBuffer.append(eventNode);
	  if (this.state == this.OPEN) {
	    this._flushEmitBuffer();
	  }
	};

	SCClientSocket.prototype.send = function (data) {
	  this.transport.send(data);
	};

	SCClientSocket.prototype.emit = function (event, data, callback) {
	  if (this._localEvents[event] == null) {
	    this._emit(event, data, callback);
	  } else if (event == 'error') {
	    Emitter.prototype.emit.call(this, event, data);
	  } else {
	    var error = new InvalidActionError('The "' + event + '" event is reserved and cannot be emitted on a client socket');
	    this._onSCError(error);
	  }
	};

	SCClientSocket.prototype.publish = function (channelName, data, callback) {
	  var pubData = {
	    channel: this._decorateChannelName(channelName),
	    data: data
	  };
	  this.emit('#publish', pubData, callback);
	};

	SCClientSocket.prototype._triggerChannelSubscribe = function (channel, subscriptionOptions) {
	  var channelName = channel.name;

	  if (channel.state != channel.SUBSCRIBED) {
	    var oldState = channel.state;
	    channel.state = channel.SUBSCRIBED;

	    var stateChangeData = {
	      channel: channelName,
	      oldState: oldState,
	      newState: channel.state,
	      subscriptionOptions: subscriptionOptions
	    };
	    channel.emit('subscribeStateChange', stateChangeData);
	    channel.emit('subscribe', channelName, subscriptionOptions);
	    Emitter.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
	    Emitter.prototype.emit.call(this, 'subscribe', channelName, subscriptionOptions);
	  }
	};

	SCClientSocket.prototype._triggerChannelSubscribeFail = function (err, channel, subscriptionOptions) {
	  var channelName = channel.name;
	  var meetsAuthRequirements = !channel.waitForAuth || this.authState == this.AUTHENTICATED;

	  if (channel.state != channel.UNSUBSCRIBED && meetsAuthRequirements) {
	    channel.state = channel.UNSUBSCRIBED;

	    channel.emit('subscribeFail', err, channelName, subscriptionOptions);
	    Emitter.prototype.emit.call(this, 'subscribeFail', err, channelName, subscriptionOptions);
	  }
	};

	// Cancel any pending subscribe callback
	SCClientSocket.prototype._cancelPendingSubscribeCallback = function (channel) {
	  if (channel._pendingSubscriptionCid != null) {
	    this.transport.cancelPendingResponse(channel._pendingSubscriptionCid);
	    delete channel._pendingSubscriptionCid;
	  }
	};

	SCClientSocket.prototype._decorateChannelName = function (channelName) {
	  if (this.channelPrefix) {
	    channelName = this.channelPrefix + channelName;
	  }
	  return channelName;
	};

	SCClientSocket.prototype._undecorateChannelName = function (decoratedChannelName) {
	  if (this.channelPrefix && decoratedChannelName.indexOf(this.channelPrefix) == 0) {
	    return decoratedChannelName.replace(this.channelPrefix, '');
	  }
	  return decoratedChannelName;
	};

	SCClientSocket.prototype._trySubscribe = function (channel) {
	  var self = this;

	  var meetsAuthRequirements = !channel.waitForAuth || this.authState == this.AUTHENTICATED;

	  // We can only ever have one pending subscribe action at any given time on a channel
	  if (this.state == this.OPEN && !this.preparingPendingSubscriptions &&
	    channel._pendingSubscriptionCid == null && meetsAuthRequirements) {

	    var options = {
	      noTimeout: true
	    };

	    var subscriptionOptions = {
	      channel: this._decorateChannelName(channel.name)
	    };
	    if (channel.waitForAuth) {
	      options.waitForAuth = true;
	      subscriptionOptions.waitForAuth = options.waitForAuth;
	    }
	    if (channel.data) {
	      subscriptionOptions.data = channel.data;
	    }
	    if (channel.batch) {
	      options.batch = true;
	      subscriptionOptions.batch = true;
	    }

	    channel._pendingSubscriptionCid = this.transport.emit(
	      '#subscribe', subscriptionOptions, options,
	      function (err) {
	        delete channel._pendingSubscriptionCid;
	        if (err) {
	          self._triggerChannelSubscribeFail(err, channel, subscriptionOptions);
	        } else {
	          self._triggerChannelSubscribe(channel, subscriptionOptions);
	        }
	      }
	    );
	    Emitter.prototype.emit.call(this, 'subscribeRequest', channel.name, subscriptionOptions);
	  }
	};

	SCClientSocket.prototype.subscribe = function (channelName, options) {
	  var channel = this.channels[channelName];

	  if (!channel) {
	    channel = new SCChannel(channelName, this, options);
	    this.channels[channelName] = channel;
	  } else if (options) {
	    channel.setOptions(options);
	  }

	  if (channel.state == channel.UNSUBSCRIBED) {
	    channel.state = channel.PENDING;
	    this._trySubscribe(channel);
	  }

	  return channel;
	};

	SCClientSocket.prototype._triggerChannelUnsubscribe = function (channel, newState) {
	  var channelName = channel.name;
	  var oldState = channel.state;

	  if (newState) {
	    channel.state = newState;
	  } else {
	    channel.state = channel.UNSUBSCRIBED;
	  }
	  this._cancelPendingSubscribeCallback(channel);

	  if (oldState == channel.SUBSCRIBED) {
	    var stateChangeData = {
	      channel: channelName,
	      oldState: oldState,
	      newState: channel.state
	    };
	    channel.emit('subscribeStateChange', stateChangeData);
	    channel.emit('unsubscribe', channelName);
	    Emitter.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
	    Emitter.prototype.emit.call(this, 'unsubscribe', channelName);
	  }
	};

	SCClientSocket.prototype._tryUnsubscribe = function (channel) {
	  var self = this;

	  if (this.state == this.OPEN) {
	    var options = {
	      noTimeout: true
	    };
	    if (channel.batch) {
	      options.batch = true;
	    }
	    // If there is a pending subscribe action, cancel the callback
	    this._cancelPendingSubscribeCallback(channel);

	    // This operation cannot fail because the TCP protocol guarantees delivery
	    // so long as the connection remains open. If the connection closes,
	    // the server will automatically unsubscribe the client and thus complete
	    // the operation on the server side.
	    var decoratedChannelName = this._decorateChannelName(channel.name);
	    this.transport.emit('#unsubscribe', decoratedChannelName, options);
	  }
	};

	SCClientSocket.prototype.unsubscribe = function (channelName) {
	  var channel = this.channels[channelName];

	  if (channel) {
	    if (channel.state != channel.UNSUBSCRIBED) {

	      this._triggerChannelUnsubscribe(channel);
	      this._tryUnsubscribe(channel);
	    }
	  }
	};

	SCClientSocket.prototype.channel = function (channelName, options) {
	  var currentChannel = this.channels[channelName];

	  if (!currentChannel) {
	    currentChannel = new SCChannel(channelName, this, options);
	    this.channels[channelName] = currentChannel;
	  }
	  return currentChannel;
	};

	SCClientSocket.prototype.destroyChannel = function (channelName) {
	  var channel = this.channels[channelName];

	  if (channel) {
	    channel.unwatch();
	    channel.unsubscribe();
	    delete this.channels[channelName];
	  }
	};

	SCClientSocket.prototype.subscriptions = function (includePending) {
	  var subs = [];
	  var channel, includeChannel;
	  for (var channelName in this.channels) {
	    if (this.channels.hasOwnProperty(channelName)) {
	      channel = this.channels[channelName];

	      if (includePending) {
	        includeChannel = channel && (channel.state == channel.SUBSCRIBED ||
	          channel.state == channel.PENDING);
	      } else {
	        includeChannel = channel && channel.state == channel.SUBSCRIBED;
	      }

	      if (includeChannel) {
	        subs.push(channelName);
	      }
	    }
	  }
	  return subs;
	};

	SCClientSocket.prototype.isSubscribed = function (channelName, includePending) {
	  var channel = this.channels[channelName];
	  if (includePending) {
	    return !!channel && (channel.state == channel.SUBSCRIBED ||
	      channel.state == channel.PENDING);
	  }
	  return !!channel && channel.state == channel.SUBSCRIBED;
	};

	SCClientSocket.prototype.processPendingSubscriptions = function () {
	  var self = this;

	  this.preparingPendingSubscriptions = false;

	  var pendingChannels = [];

	  for (var i in this.channels) {
	    if (this.channels.hasOwnProperty(i)) {
	      var channel = this.channels[i];
	      if (channel.state == channel.PENDING) {
	        pendingChannels.push(channel);
	      }
	    }
	  }

	  pendingChannels.sort(function (a, b) {
	    var ap = a.priority || 0;
	    var bp = b.priority || 0;
	    if (ap > bp) {
	      return -1;
	    }
	    if (ap < bp) {
	      return 1;
	    }
	    return 0;
	  });

	  pendingChannels.forEach(function (channel) {
	    self._trySubscribe(channel);
	  });
	};

	SCClientSocket.prototype.watch = function (channelName, handler) {
	  if (typeof handler != 'function') {
	    throw new InvalidArgumentsError('No handler function was provided');
	  }
	  this._channelEmitter.on(channelName, handler);
	};

	SCClientSocket.prototype.unwatch = function (channelName, handler) {
	  if (handler) {
	    this._channelEmitter.removeListener(channelName, handler);
	  } else {
	    this._channelEmitter.removeAllListeners(channelName);
	  }
	};

	SCClientSocket.prototype.watchers = function (channelName) {
	  return this._channelEmitter.listeners(channelName);
	};

	module.exports = SCClientSocket;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(7).Buffer))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];
	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex;
	  return bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	module.exports = bytesToUuid;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	// Unique ID creation requires a high quality random # generator.  In the
	// browser this is a little complicated due to unknown quality of Math.random()
	// and inconsistent support for the `crypto` API.  We do the best we can via
	// feature-detection

	// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
	var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
	                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
	if (getRandomValues) {
	  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

	  module.exports = function whatwgRNG() {
	    getRandomValues(rnds8);
	    return rnds8;
	  };
	} else {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var rnds = new Array(16);

	  module.exports = function mathRNG() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return rnds;
	  };
	}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _mobx = __webpack_require__(1);

	var mobx = _interopRequireWildcard(_mobx);

	var _spy = __webpack_require__(18);

	var _spy2 = _interopRequireDefault(_spy);

	var _getDecorator = __webpack_require__(5);

	var _getDecorator2 = _interopRequireDefault(_getDecorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function dev(_store, config) {
	  if ((!config || !config.remote) && (typeof window === 'undefined' || !window.devToolsExtension)) {
	    return _store;
	  }

	  if (mobx.isObservable(_store)) {
	    (0, _spy2.default)(_store, config);
	  } else if (typeof _store === 'function') {
	    /* eslint-disable no-param-reassign */
	    if (!config) config = {};
	    if (!config.name) config.name = _store.name;
	    _store = function (_store2) {
	      _inherits(store, _store2);

	      function store() {
	        _classCallCheck(this, store);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, _store2.call.apply(_store2, [this].concat(args)));

	        (0, _spy2.default)(_this, config);
	        return _this;
	      }

	      return store;
	    }(_store);
	    /* eslint-enable */
	  } else {
	    console.warn('Passed ' + (typeof _store === 'undefined' ? 'undefined' : _typeof(_store)) + ' to mobx-remotedev, which is not an observable.');
	  }

	  return _store;
	}

	exports.default = (0, _getDecorator2.default)(dev);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.isFiltered = isFiltered;
	function isFiltered(action, filter) {
	  if (!filter) return false;

	  var whitelist = filter.whitelist,
	      blacklist = filter.blacklist;

	  return whitelist && !action.type.match(whitelist) || blacklist && action.type.match(blacklist);
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isMonitorAction = undefined;
	exports.dispatchMonitorAction = dispatchMonitorAction;

	var _mobx = __webpack_require__(1);

	var mobx = _interopRequireWildcard(_mobx);

	var _jsan = __webpack_require__(4);

	var _remotedevUtils = __webpack_require__(35);

	var _utils = __webpack_require__(6);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var isMonitorAction = exports.isMonitorAction = function isMonitorAction(store) {
	  return store.__isRemotedevAction === true;
	};

	function dispatch(store, _ref) {
	  var type = _ref.type,
	      args = _ref.arguments;

	  if (typeof store[type] === 'function') {
	    (0, _utils.silently)(function () {
	      store[type].apply(store, args);
	    }, store);
	  }
	}

	function dispatchRemotely(devTools, store, payload) {
	  try {
	    (0, _remotedevUtils.evalMethod)(payload, store);
	  } catch (e) {
	    devTools.error(e.message);
	  }
	}

	function toggleAction(store, id, strState) {
	  var liftedState = (0, _jsan.parse)(strState);
	  var idx = liftedState.skippedActionIds.indexOf(id);
	  var skipped = idx !== -1;
	  var start = liftedState.stagedActionIds.indexOf(id);
	  if (start === -1) return liftedState;

	  (0, _utils.setValue)(store, liftedState.computedStates[start - 1].state);
	  for (var i = skipped ? start : start + 1; i < liftedState.stagedActionIds.length; i++) {
	    if (i !== start && liftedState.skippedActionIds.indexOf(liftedState.stagedActionIds[i]) !== -1) continue; // it's already skipped
	    dispatch(store, liftedState.actionsById[liftedState.stagedActionIds[i]].action);
	    liftedState.computedStates[i].state = mobx.toJS(store);
	  }

	  if (skipped) {
	    liftedState.skippedActionIds.splice(idx, 1);
	  } else {
	    liftedState.skippedActionIds.push(id);
	  }
	  return liftedState;
	}

	function dispatchMonitorAction(store, devTools, onlyActions) {
	  var initValue = mobx.toJS(store);
	  devTools.init(initValue, (0, _remotedevUtils.getMethods)(store));

	  return function (message) {
	    if (message.type === 'DISPATCH') {
	      switch (message.payload.type) {
	        case 'RESET':
	          devTools.init((0, _utils.setValue)(store, initValue));
	          return;
	        case 'COMMIT':
	          devTools.init(mobx.toJS(store));
	          return;
	        case 'ROLLBACK':
	          devTools.init((0, _utils.setValue)(store, (0, _jsan.parse)(message.state)));
	          return;
	        case 'JUMP_TO_STATE':
	        case 'JUMP_TO_ACTION':
	          (0, _utils.setValue)(store, (0, _jsan.parse)(message.state));
	          return;
	        case 'TOGGLE_ACTION':
	          if (!onlyActions) {
	            console.warn('`onlyActions` parameter should be `true` to skip actions: ' + 'https://github.com/zalmoxisus/mobx-remotedev#remotedevstore-config');
	            return;
	          }
	          devTools.send(null, toggleAction(store, message.payload.id, message.state));
	          return;
	        case 'IMPORT_STATE':
	          {
	            var nextLiftedState = message.payload.nextLiftedState;
	            var computedStates = nextLiftedState.computedStates;

	            (0, _utils.setValue)(store, computedStates[computedStates.length - 1].state);
	            devTools.send(null, nextLiftedState);
	            return;
	          }
	      }
	    } else if (message.type === 'ACTION') {
	      dispatchRemotely(devTools, store, message.payload);
	    }
	  };
	}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = spy;

	var _mobx = __webpack_require__(1);

	var mobx = _interopRequireWildcard(_mobx);

	var _remotedev = __webpack_require__(38);

	var _utils = __webpack_require__(6);

	var _filters = __webpack_require__(16);

	var _monitorActions = __webpack_require__(17);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var isSpyEnabled = false;
	var fallbackStoreName = void 0;
	var stores = {};
	var onlyActions = {};
	var filters = {};
	var monitors = {};
	var scheduled = [];

	function configure(name) {
	  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (typeof config.onlyActions === 'undefined') {
	    onlyActions[name] = mobx._getGlobalState && mobx._getGlobalState().enforceActions;
	  } else {
	    onlyActions[name] = config.onlyActions;
	  }
	  if (config.filters) filters[name] = config.filters;
	  if (config.global) {
	    if (fallbackStoreName) throw Error('You\'ve already defined a global store');
	    fallbackStoreName = name;
	  }
	}

	function init(store, config) {
	  var name = mobx.getDebugName(store);
	  configure(name, config);
	  stores[name] = store;

	  var devTools = (0, _remotedev.connectViaExtension)(config);
	  devTools.subscribe((0, _monitorActions.dispatchMonitorAction)(store, devTools, onlyActions[name]));
	  monitors[name] = devTools;
	}

	function schedule(name, action) {
	  var toSend = void 0;
	  if (action && !(0, _filters.isFiltered)(action, filters[name])) {
	    toSend = function toSend() {
	      monitors[name].send(action, mobx.toJS(stores[name]));
	    };
	  }
	  scheduled.push(toSend);
	}

	function send() {
	  if (scheduled.length) {
	    var toSend = scheduled.pop();
	    if (toSend) toSend();
	  }
	}

	function spy(store, config) {
	  init(store, config);
	  if (isSpyEnabled) return;
	  isSpyEnabled = true;
	  var objName = void 0;

	  mobx.spy(function (change) {
	    if (change.spyReportStart) {
	      objName = (0, _utils.getName)(change.object || change.target);
	      if (change.type === 'reaction') {
	        // TODO: show reactions
	        schedule(objName);
	        return;
	      }
	      if (!stores[objName]) objName = fallbackStoreName;
	      if (!stores[objName] || stores[objName].__isRemotedevAction) {
	        schedule(objName);
	        return;
	      }
	      if (change.fn && change.fn.__isRemotedevAction) {
	        schedule(objName);
	        return;
	      }
	      if (change.type === 'action') {
	        var action = (0, _utils.createAction)(change.name);
	        if (change.arguments && change.arguments.length) action.arguments = change.arguments;
	        if (!onlyActions[objName]) {
	          schedule(objName, _extends({}, action, { type: '\u250F ' + action.type }));
	          send();
	          schedule(objName, _extends({}, action, { type: '\u2517 ' + action.type }));
	        } else {
	          schedule(objName, action);
	        }
	      } else if (change.type && mobx.isObservable(change.object)) {
	        schedule(objName, !onlyActions[objName] && (0, _utils.createAction)(change.type, change));
	      }
	    } else if (change.spyReportEnd) {
	      send();
	    }
	  });
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
	;(function(root) {

		// Detect free variables `exports`.
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`.
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code, and use
		// it as `root`.
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var InvalidCharacterError = function(message) {
			this.message = message;
		};
		InvalidCharacterError.prototype = new Error;
		InvalidCharacterError.prototype.name = 'InvalidCharacterError';

		var error = function(message) {
			// Note: the error messages used throughout this file match those used by
			// the native `atob`/`btoa` implementation in Chromium.
			throw new InvalidCharacterError(message);
		};

		var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// http://whatwg.org/html/common-microsyntaxes.html#space-character
		var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

		// `decode` is designed to be fully compatible with `atob` as described in the
		// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
		// The optimized base64-decoding algorithm used is based on @atk’s excellent
		// implementation. https://gist.github.com/atk/1020396
		var decode = function(input) {
			input = String(input)
				.replace(REGEX_SPACE_CHARACTERS, '');
			var length = input.length;
			if (length % 4 == 0) {
				input = input.replace(/==?$/, '');
				length = input.length;
			}
			if (
				length % 4 == 1 ||
				// http://whatwg.org/C#alphanumeric-ascii-characters
				/[^+a-zA-Z0-9/]/.test(input)
			) {
				error(
					'Invalid character: the string to be decoded is not correctly encoded.'
				);
			}
			var bitCounter = 0;
			var bitStorage;
			var buffer;
			var output = '';
			var position = -1;
			while (++position < length) {
				buffer = TABLE.indexOf(input.charAt(position));
				bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
				// Unless this is the first of a group of 4 characters…
				if (bitCounter++ % 4) {
					// …convert the first 8 bits to a single ASCII character.
					output += String.fromCharCode(
						0xFF & bitStorage >> (-2 * bitCounter & 6)
					);
				}
			}
			return output;
		};

		// `encode` is designed to be fully compatible with `btoa` as described in the
		// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
		var encode = function(input) {
			input = String(input);
			if (/[^\0-\xFF]/.test(input)) {
				// Note: no need to special-case astral symbols here, as surrogates are
				// matched, and the input is supposed to only contain ASCII anyway.
				error(
					'The string to be encoded contains characters outside of the ' +
					'Latin1 range.'
				);
			}
			var padding = input.length % 3;
			var output = '';
			var position = -1;
			var a;
			var b;
			var c;
			var d;
			var buffer;
			// Make sure any padding is handled outside of the loop.
			var length = input.length - padding;

			while (++position < length) {
				// Read three bytes, i.e. 24 bits.
				a = input.charCodeAt(position) << 16;
				b = input.charCodeAt(++position) << 8;
				c = input.charCodeAt(++position);
				buffer = a + b + c;
				// Turn the 24 bits into four chunks of 6 bits each, and append the
				// matching character for each of them to the output.
				output += (
					TABLE.charAt(buffer >> 18 & 0x3F) +
					TABLE.charAt(buffer >> 12 & 0x3F) +
					TABLE.charAt(buffer >> 6 & 0x3F) +
					TABLE.charAt(buffer & 0x3F)
				);
			}

			if (padding == 2) {
				a = input.charCodeAt(position) << 8;
				b = input.charCodeAt(++position);
				buffer = a + b;
				output += (
					TABLE.charAt(buffer >> 10) +
					TABLE.charAt((buffer >> 4) & 0x3F) +
					TABLE.charAt((buffer << 2) & 0x3F) +
					'='
				);
			} else if (padding == 1) {
				buffer = input.charCodeAt(position);
				output += (
					TABLE.charAt(buffer >> 2) +
					TABLE.charAt((buffer << 4) & 0x3F) +
					'=='
				);
			}

			return output;
		};

		var base64 = {
			'encode': encode,
			'decode': decode,
			'version': '0.1.0'
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return base64;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = base64;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in base64) {
					base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.base64 = base64;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)(module), (function() { return this; }())))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function getLens (b64) {
	  var len = b64.length

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=')
	  if (validLen === -1) validLen = len

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4)

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

	  var curByte = 0

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen

	  for (var i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)]
	    arr[curByte++] = (tmp >> 16) & 0xFF
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(
	      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
	    ))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    )
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    )
	  }

	  return parts.join('')
	}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var clone = (function() {
	'use strict';

	function _instanceof(obj, type) {
	  return type != null && obj instanceof type;
	}

	var nativeMap;
	try {
	  nativeMap = Map;
	} catch(_) {
	  // maybe a reference error because no `Map`. Give it a dummy value that no
	  // value will ever be an instanceof.
	  nativeMap = function() {};
	}

	var nativeSet;
	try {
	  nativeSet = Set;
	} catch(_) {
	  nativeSet = function() {};
	}

	var nativePromise;
	try {
	  nativePromise = Promise;
	} catch(_) {
	  nativePromise = function() {};
	}

	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
	 *    should be cloned as well. Non-enumerable properties on the prototype
	 *    chain will be ignored. (optional - false by default)
	*/
	function clone(parent, circular, depth, prototype, includeNonEnumerable) {
	  if (typeof circular === 'object') {
	    depth = circular.depth;
	    prototype = circular.prototype;
	    includeNonEnumerable = circular.includeNonEnumerable;
	    circular = circular.circular;
	  }
	  // maintain two arrays for circular references, where corresponding parents
	  // and children have the same index
	  var allParents = [];
	  var allChildren = [];

	  var useBuffer = typeof Buffer != 'undefined';

	  if (typeof circular == 'undefined')
	    circular = true;

	  if (typeof depth == 'undefined')
	    depth = Infinity;

	  // recurse this function so we don't reset allParents and allChildren
	  function _clone(parent, depth) {
	    // cloning null always returns null
	    if (parent === null)
	      return null;

	    if (depth === 0)
	      return parent;

	    var child;
	    var proto;
	    if (typeof parent != 'object') {
	      return parent;
	    }

	    if (_instanceof(parent, nativeMap)) {
	      child = new nativeMap();
	    } else if (_instanceof(parent, nativeSet)) {
	      child = new nativeSet();
	    } else if (_instanceof(parent, nativePromise)) {
	      child = new nativePromise(function (resolve, reject) {
	        parent.then(function(value) {
	          resolve(_clone(value, depth - 1));
	        }, function(err) {
	          reject(_clone(err, depth - 1));
	        });
	      });
	    } else if (clone.__isArray(parent)) {
	      child = [];
	    } else if (clone.__isRegExp(parent)) {
	      child = new RegExp(parent.source, __getRegExpFlags(parent));
	      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
	    } else if (clone.__isDate(parent)) {
	      child = new Date(parent.getTime());
	    } else if (useBuffer && Buffer.isBuffer(parent)) {
	      child = new Buffer(parent.length);
	      parent.copy(child);
	      return child;
	    } else if (_instanceof(parent, Error)) {
	      child = Object.create(parent);
	    } else {
	      if (typeof prototype == 'undefined') {
	        proto = Object.getPrototypeOf(parent);
	        child = Object.create(proto);
	      }
	      else {
	        child = Object.create(prototype);
	        proto = prototype;
	      }
	    }

	    if (circular) {
	      var index = allParents.indexOf(parent);

	      if (index != -1) {
	        return allChildren[index];
	      }
	      allParents.push(parent);
	      allChildren.push(child);
	    }

	    if (_instanceof(parent, nativeMap)) {
	      parent.forEach(function(value, key) {
	        var keyChild = _clone(key, depth - 1);
	        var valueChild = _clone(value, depth - 1);
	        child.set(keyChild, valueChild);
	      });
	    }
	    if (_instanceof(parent, nativeSet)) {
	      parent.forEach(function(value) {
	        var entryChild = _clone(value, depth - 1);
	        child.add(entryChild);
	      });
	    }

	    for (var i in parent) {
	      var attrs;
	      if (proto) {
	        attrs = Object.getOwnPropertyDescriptor(proto, i);
	      }

	      if (attrs && attrs.set == null) {
	        continue;
	      }
	      child[i] = _clone(parent[i], depth - 1);
	    }

	    if (Object.getOwnPropertySymbols) {
	      var symbols = Object.getOwnPropertySymbols(parent);
	      for (var i = 0; i < symbols.length; i++) {
	        // Don't need to worry about cloning a symbol because it is a primitive,
	        // like a number or string.
	        var symbol = symbols[i];
	        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
	        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
	          continue;
	        }
	        child[symbol] = _clone(parent[symbol], depth - 1);
	        if (!descriptor.enumerable) {
	          Object.defineProperty(child, symbol, {
	            enumerable: false
	          });
	        }
	      }
	    }

	    if (includeNonEnumerable) {
	      var allPropertyNames = Object.getOwnPropertyNames(parent);
	      for (var i = 0; i < allPropertyNames.length; i++) {
	        var propertyName = allPropertyNames[i];
	        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
	        if (descriptor && descriptor.enumerable) {
	          continue;
	        }
	        child[propertyName] = _clone(parent[propertyName], depth - 1);
	        Object.defineProperty(child, propertyName, {
	          enumerable: false
	        });
	      }
	    }

	    return child;
	  }

	  return _clone(parent, depth);
	}

	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function clonePrototype(parent) {
	  if (parent === null)
	    return null;

	  var c = function () {};
	  c.prototype = parent;
	  return new c();
	};

	// private utility functions

	function __objToStr(o) {
	  return Object.prototype.toString.call(o);
	}
	clone.__objToStr = __objToStr;

	function __isDate(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Date]';
	}
	clone.__isDate = __isDate;

	function __isArray(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Array]';
	}
	clone.__isArray = __isArray;

	function __isRegExp(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
	}
	clone.__isRegExp = __isRegExp;

	function __getRegExpFlags(re) {
	  var flags = '';
	  if (re.global) flags += 'g';
	  if (re.ignoreCase) flags += 'i';
	  if (re.multiline) flags += 'm';
	  return flags;
	}
	clone.__getRegExpFlags = __getRegExpFlags;

	return clone;
	})();

	if (typeof module === 'object' && module.exports) {
	  module.exports = clone;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/* global window */
	var GetParams = function (func) {
		'use strict';

		if (typeof func !== 'function') {
			return [];
		}

		var patternComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		var patternArguments = /([^\s,]+)/g;

		var funcString = func
			.toString()
			.replace(patternComments, '');

		var result = funcString
			.slice(
				funcString.indexOf('(') + 1,
				funcString.indexOf(')')
			)
			.match(patternArguments);

		if (result === null) {
			return [];
		}

		return result;
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = GetParams;
	}

	if (typeof window !== 'undefined') {
		window.GetParams = GetParams;
	}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var pathGetter = __webpack_require__(9);
	var utils = __webpack_require__(26);

	var WMap = typeof WeakMap !== 'undefined'?
	  WeakMap:
	  function() {
	    var keys = [];
	    var values = [];
	    return {
	      set: function(key, value) {
	        keys.push(key);
	        values.push(value);
	      },
	      get: function(key) {
	        for (var i = 0; i < keys.length; i++) {
	          if (keys[i] === key) {
	            return values[i];
	          }
	        }
	      }
	    }
	  };

	// Based on https://github.com/douglascrockford/JSON-js/blob/master/cycle.js

	exports.decycle = function decycle(object, options, replacer) {
	  'use strict';

	  var map = new WMap()

	  var noCircularOption = !Object.prototype.hasOwnProperty.call(options, 'circular');
	  var withRefs = options.refs !== false;

	  return (function derez(_value, path, key) {

	    // The derez recurses through the object, producing the deep copy.

	    var i,        // The loop counter
	      name,       // Property name
	      nu;         // The new object or array

	    // typeof null === 'object', so go on if this value is really an object but not
	    // one of the weird builtin objects.

	    var value = typeof replacer === 'function' ? replacer(key || '', _value) : _value;

	    if (options.date && value instanceof Date) {
	      return {$jsan: 'd' + value.getTime()};
	    }
	    if (options.regex && value instanceof RegExp) {
	      return {$jsan: 'r' + utils.getRegexFlags(value) + ',' + value.source};
	    }
	    if (options['function'] && typeof value === 'function') {
	      return {$jsan: 'f' + utils.stringifyFunction(value, options['function'])}
	    }
	    if (options['nan'] && typeof value === 'number' && isNaN(value)) {
	      return {$jsan: 'n'}
	    }
	    if (options['infinity']) {
	      if (Number.POSITIVE_INFINITY === value) return {$jsan: 'i'}
	      if (Number.NEGATIVE_INFINITY === value) return {$jsan: 'y'}
	    }
	    if (options['undefined'] && value === undefined) {
	      return {$jsan: 'u'}
	    }
	    if (options['error'] && value instanceof Error) {
	      return {$jsan: 'e' + value.message}
	    }
	    if (options['symbol'] && typeof value === 'symbol') {
	      var symbolKey = Symbol.keyFor(value)
	      if (symbolKey !== undefined) {
	        return {$jsan: 'g' + symbolKey}
	      }

	      // 'Symbol(foo)'.slice(7, -1) === 'foo'
	      return {$jsan: 's' + value.toString().slice(7, -1)}
	    }

	    if (options['map'] && typeof Map === 'function' && value instanceof Map && typeof Array.from === 'function') {
	      return {$jsan: 'm' + JSON.stringify(decycle(Array.from(value), options, replacer))}
	    }

	    if (options['set'] && typeof Set === 'function' && value instanceof Set && typeof Array.from === 'function') {
	      return {$jsan: 'l' + JSON.stringify(decycle(Array.from(value), options, replacer))}
	    }

	    if (value && typeof value.toJSON === 'function') {
	      try {
	        value = value.toJSON(key);
	      } catch (error) {
	        var keyString = (key || '$');
	        return "toJSON failed for '" + (map.get(value) || keyString) + "'";
	      }
	    }

	    if (typeof value === 'object' && value !== null &&
	      !(value instanceof Boolean) &&
	      !(value instanceof Date)    &&
	      !(value instanceof Number)  &&
	      !(value instanceof RegExp)  &&
	      !(value instanceof String)  &&
	      !(typeof value === 'symbol')  &&
	      !(value instanceof Error)) {

	        // If the value is an object or array, look to see if we have already
	        // encountered it. If so, return a $ref/path object.

	      if (typeof value === 'object') {
	        var foundPath = map.get(value);
	        if (foundPath) {
	          if (noCircularOption && withRefs) {
	            return {$jsan: foundPath};
	          }
	          if (path.indexOf(foundPath) === 0) {
	            if (!noCircularOption) {
	              return typeof options.circular === 'function'?
	              options.circular(value, path, foundPath):
	              options.circular;
	            }
	            return {$jsan: foundPath};
	          }
	          if (withRefs) return {$jsan: foundPath};
	        }
	        map.set(value, path);
	      }


	      // If it is an array, replicate the array.

	      if (Object.prototype.toString.apply(value) === '[object Array]') {
	          nu = [];
	          for (i = 0; i < value.length; i += 1) {
	              nu[i] = derez(value[i], path + '[' + i + ']', i);
	          }
	      } else {

	        // If it is an object, replicate the object.

	        nu = {};
	        for (name in value) {
	          if (Object.prototype.hasOwnProperty.call(value, name)) {
	            var nextPath = /^\w+$/.test(name) ?
	              '.' + name :
	              '[' + JSON.stringify(name) + ']';
	            nu[name] = name === '$jsan' ? [derez(value[name], path + nextPath)] : derez(value[name], path + nextPath, name);
	          }
	        }
	      }
	      return nu;
	    }
	    return value;
	  }(object, '$'));
	};


	exports.retrocycle = function retrocycle($) {
	  'use strict';


	  return (function rez(value) {

	    // The rez function walks recursively through the object looking for $jsan
	    // properties. When it finds one that has a value that is a path, then it
	    // replaces the $jsan object with a reference to the value that is found by
	    // the path.

	    var i, item, name, path;

	    if (value && typeof value === 'object') {
	      if (Object.prototype.toString.apply(value) === '[object Array]') {
	        for (i = 0; i < value.length; i += 1) {
	          item = value[i];
	          if (item && typeof item === 'object') {
	            if (item.$jsan) {
	              value[i] = utils.restore(item.$jsan, $);
	            } else {
	              rez(item);
	            }
	          }
	        }
	      } else {
	        for (name in value) {
	          // base case passed raw object
	          if(typeof value[name] === 'string' && name === '$jsan'){
	            return utils.restore(value.$jsan, $);
	            break;
	          }
	          else {
	            if (name === '$jsan') {
	              value[name] = value[name][0];
	            }
	            if (typeof value[name] === 'object') {
	              item = value[name];
	              if (item && typeof item === 'object') {
	                if (item.$jsan) {
	                  value[name] = utils.restore(item.$jsan, $);
	                } else {
	                  rez(item);
	                }
	              }
	            }
	          }
	        }
	      }
	    }
	    return value;
	  }($));
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var pathGetter = __webpack_require__(9);
	var jsan = __webpack_require__(8);

	exports.getRegexFlags = function getRegexFlags(regex) {
	  var flags = '';
	  if (regex.ignoreCase) flags += 'i';
	  if (regex.global) flags += 'g';
	  if (regex.multiline) flags += 'm';
	  return flags;
	};

	exports.stringifyFunction = function stringifyFunction(fn, customToString) {
	  if (typeof customToString === 'function') {
	    return customToString(fn);
	  }
	  var str = fn.toString();
	  var match = str.match(/^[^{]*{|^[^=]*=>/);
	  var start = match ? match[0] : '<function> ';
	  var end = str[str.length - 1] === '}' ? '}' : '';
	  return start.replace(/\r\n|\n/g, ' ').replace(/\s+/g, ' ') + ' /* ... */ ' + end;
	};

	exports.restore = function restore(obj, root) {
	  var type = obj[0];
	  var rest = obj.slice(1);
	  switch(type) {
	    case '$':
	      return pathGetter(root, obj);
	    case 'r':
	      var comma = rest.indexOf(',');
	      var flags = rest.slice(0, comma);
	      var source = rest.slice(comma + 1);
	      return RegExp(source, flags);
	    case 'd':
	      return new Date(+rest);
	    case 'f':
	      var fn = function() { throw new Error("can't run jsan parsed function") };
	      fn.toString = function() { return rest; };
	      return fn;
	    case 'u':
	      return undefined;
	    case 'e':
	      var error = new Error(rest);
	      error.stack = 'Stack is unavailable for jsan parsed errors';
	      return error;
	    case 's':
	      return Symbol(rest);
	    case 'g':
	      return Symbol.for(rest);
	    case 'm':
	      return new Map(jsan.parse(rest));
	    case 'l':
	      return new Set(jsan.parse(rest));
	    case 'n':
	      return NaN;
	    case 'i':
	      return Infinity;
	    case 'y':
	      return -Infinity;
	    default:
	      console.warn('unknown type', obj);
	      return obj;
	  }
	}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Constants.
	 */

	var errorMessage;

	errorMessage = 'An argument without append, prepend, ' +
	    'or detach methods was given to `List';

	/**
	 * Creates a new List: A linked list is a bit like an Array, but
	 * knows nothing about how many items are in it, and knows only about its
	 * first (`head`) and last (`tail`) items. Each item (e.g. `head`, `tail`,
	 * &c.) knows which item comes before or after it (its more like the
	 * implementation of the DOM in JavaScript).
	 * @global
	 * @private
	 * @constructor
	 * @class Represents an instance of List.
	 */

	function List(/*items...*/) {
	    if (arguments.length) {
	        return List.from(arguments);
	    }
	}

	var ListPrototype;

	ListPrototype = List.prototype;

	/**
	 * Creates a new list from the arguments (each a list item) passed in.
	 * @name List.of
	 * @param {...ListItem} [items] - Zero or more items to attach.
	 * @returns {list} - A new instance of List.
	 */

	List.of = function (/*items...*/) {
	    return List.from.call(this, arguments);
	};

	/**
	 * Creates a new list from the given array-like object (each a list item)
	 * passed in.
	 * @name List.from
	 * @param {ListItem[]} [items] - The items to append.
	 * @returns {list} - A new instance of List.
	 */
	List.from = function (items) {
	    var list = new this(), length, iterator, item;

	    if (items && (length = items.length)) {
	        iterator = -1;

	        while (++iterator < length) {
	            item = items[iterator];

	            if (item !== null && item !== undefined) {
	                list.append(item);
	            }
	        }
	    }

	    return list;
	};

	/**
	 * List#head
	 * Default to `null`.
	 */
	ListPrototype.head = null;

	/**
	 * List#tail
	 * Default to `null`.
	 */
	ListPrototype.tail = null;

	/**
	 * Returns the list's items as an array. This does *not* detach the items.
	 * @name List#toArray
	 * @returns {ListItem[]} - An array of (still attached) ListItems.
	 */
	ListPrototype.toArray = function () {
	    var item = this.head,
	        result = [];

	    while (item) {
	        result.push(item);
	        item = item.next;
	    }

	    return result;
	};

	/**
	 * Prepends the given item to the list: Item will be the new first item
	 * (`head`).
	 * @name List#prepend
	 * @param {ListItem} item - The item to prepend.
	 * @returns {ListItem} - An instance of ListItem (the given item).
	 */
	ListPrototype.prepend = function (item) {
	    if (!item) {
	        return false;
	    }

	    if (!item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + '#prepend`.');
	    }

	    var self, head;

	    // Cache self.
	    self = this;

	    // If self has a first item, defer prepend to the first items prepend
	    // method, and return the result.
	    head = self.head;

	    if (head) {
	        return head.prepend(item);
	    }

	    // ...otherwise, there is no `head` (or `tail`) item yet.

	    // Detach the prependee.
	    item.detach();

	    // Set the prependees parent list to reference self.
	    item.list = self;

	    // Set self's first item to the prependee, and return the item.
	    self.head = item;

	    return item;
	};

	/**
	 * Appends the given item to the list: Item will be the new last item (`tail`)
	 * if the list had a first item, and its first item (`head`) otherwise.
	 * @name List#append
	 * @param {ListItem} item - The item to append.
	 * @returns {ListItem} - An instance of ListItem (the given item).
	 */

	ListPrototype.append = function (item) {
	    if (!item) {
	        return false;
	    }

	    if (!item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + '#append`.');
	    }

	    var self, head, tail;

	    // Cache self.
	    self = this;

	    // If self has a last item, defer appending to the last items append
	    // method, and return the result.
	    tail = self.tail;

	    if (tail) {
	        return tail.append(item);
	    }

	    // If self has a first item, defer appending to the first items append
	    // method, and return the result.
	    head = self.head;

	    if (head) {
	        return head.append(item);
	    }

	    // ...otherwise, there is no `tail` or `head` item yet.

	    // Detach the appendee.
	    item.detach();

	    // Set the appendees parent list to reference self.
	    item.list = self;

	    // Set self's first item to the appendee, and return the item.
	    self.head = item;

	    return item;
	};

	/**
	 * Creates a new ListItem: A linked list item is a bit like DOM node:
	 * It knows only about its "parent" (`list`), the item before it (`prev`),
	 * and the item after it (`next`).
	 * @global
	 * @private
	 * @constructor
	 * @class Represents an instance of ListItem.
	 */

	function ListItem() {}

	List.Item = ListItem;

	var ListItemPrototype = ListItem.prototype;

	ListItemPrototype.next = null;

	ListItemPrototype.prev = null;

	ListItemPrototype.list = null;

	/**
	 * Detaches the item operated on from its parent list.
	 * @name ListItem#detach
	 * @returns {ListItem} - The item operated on.
	 */
	ListItemPrototype.detach = function () {
	    // Cache self, the parent list, and the previous and next items.
	    var self = this,
	        list = self.list,
	        prev = self.prev,
	        next = self.next;

	    // If the item is already detached, return self.
	    if (!list) {
	        return self;
	    }

	    // If self is the last item in the parent list, link the lists last item
	    // to the previous item.
	    if (list.tail === self) {
	        list.tail = prev;
	    }

	    // If self is the first item in the parent list, link the lists first item
	    // to the next item.
	    if (list.head === self) {
	        list.head = next;
	    }

	    // If both the last and first items in the parent list are the same,
	    // remove the link to the last item.
	    if (list.tail === list.head) {
	        list.tail = null;
	    }

	    // If a previous item exists, link its next item to selfs next item.
	    if (prev) {
	        prev.next = next;
	    }

	    // If a next item exists, link its previous item to selfs previous item.
	    if (next) {
	        next.prev = prev;
	    }

	    // Remove links from self to both the next and previous items, and to the
	    // parent list.
	    self.prev = self.next = self.list = null;

	    // Return self.
	    return self;
	};

	/**
	 * Prepends the given item *before* the item operated on.
	 * @name ListItem#prepend
	 * @param {ListItem} item - The item to prepend.
	 * @returns {ListItem} - The item operated on, or false when that item is not
	 * attached.
	 */
	ListItemPrototype.prepend = function (item) {
	    if (!item || !item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + 'Item#prepend`.');
	    }

	    // Cache self, the parent list, and the previous item.
	    var self = this,
	        list = self.list,
	        prev = self.prev;

	    // If self is detached, return false.
	    if (!list) {
	        return false;
	    }

	    // Detach the prependee.
	    item.detach();

	    // If self has a previous item...
	    if (prev) {
	        // ...link the prependees previous item, to selfs previous item.
	        item.prev = prev;

	        // ...link the previous items next item, to self.
	        prev.next = item;
	    }

	    // Set the prependees next item to self.
	    item.next = self;

	    // Set the prependees parent list to selfs parent list.
	    item.list = list;

	    // Set the previous item of self to the prependee.
	    self.prev = item;

	    // If self is the first item in the parent list, link the lists first item
	    // to the prependee.
	    if (self === list.head) {
	        list.head = item;
	    }

	    // If the the parent list has no last item, link the lists last item to
	    // self.
	    if (!list.tail) {
	        list.tail = self;
	    }

	    // Return the prependee.
	    return item;
	};

	/**
	 * Appends the given item *after* the item operated on.
	 * @name ListItem#append
	 * @param {ListItem} item - The item to append.
	 * @returns {ListItem} - The item operated on, or false when that item is not
	 * attached.
	 */
	ListItemPrototype.append = function (item) {
	    // If item is falsey, return false.
	    if (!item || !item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + 'Item#append`.');
	    }

	    // Cache self, the parent list, and the next item.
	    var self = this,
	        list = self.list,
	        next = self.next;

	    // If self is detached, return false.
	    if (!list) {
	        return false;
	    }

	    // Detach the appendee.
	    item.detach();

	    // If self has a next item...
	    if (next) {
	        // ...link the appendees next item, to selfs next item.
	        item.next = next;

	        // ...link the next items previous item, to the appendee.
	        next.prev = item;
	    }

	    // Set the appendees previous item to self.
	    item.prev = self;

	    // Set the appendees parent list to selfs parent list.
	    item.list = list;

	    // Set the next item of self to the appendee.
	    self.next = item;

	    // If the the parent list has no last item or if self is the parent lists
	    // last item, link the lists last item to the appendee.
	    if (self === list.tail || !list.tail) {
	        list.tail = item;
	    }

	    // Return the appendee.
	    return item;
	};

	/**
	 * Expose `List`.
	 */

	module.exports = List;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(27);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	var url = 'bjectxporhasOwnP0123456789ABCDEFGHIJKLMNQRSTUVWXYZ_dfgiklmquvyz~'

	/**
	 * Generate URL-friendly unique ID. This method use non-secure predictable
	 * random generator.
	 *
	 * By default, ID will have 21 symbols to have a collision probability similar
	 * to UUID v4.
	 *
	 * @param {number} [size=21] The number of symbols in ID.
	 *
	 * @return {string} Random string.
	 *
	 * @example
	 * const nanoid = require('nanoid/non-secure')
	 * model.id = nanoid() //=> "Uakgb_J5m9g~0JDMbcJqL"
	 *
	 * @name nonSecure
	 * @function
	 */
	module.exports = function (size) {
	  size = size || 21
	  var id = ''
	  while (0 < size--) {
	    id += url[Math.random() * 64 | 0]
	  }
	  return id
	}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	// jsan stringify options

	module.exports = {
	  'refs': false, // references can't be resolved on the original Immutable structure
	  'date': true,
	  'function': true,
	  'regex': true,
	  'undefined': true,
	  'error': true,
	  'symbol': true,
	  'map': true,
	  'set': true,
	  'nan': true,
	  'infinity': true
	};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	function mark(data, type, transformMethod) {
	  return {
	    data: transformMethod ? data[transformMethod]() : data,
	    __serializedType__: type
	  };
	}

	function extract(data, type) {
	  return {
	    data: Object.assign({}, data),
	    __serializedType__: type
	  };
	}

	function refer(data, type, isArray, refs) {
	  var r = mark(data, type, isArray);
	  if (!refs) return r;
	  for (var i = 0; i < refs.length; i++) {
	    var ref = refs[i];
	    if (typeof ref === 'function' && data instanceof ref) {
	      r.__serializedRef__ = i;
	      return r;
	    }
	  }
	  return r;
	}

	module.exports = {
	  mark: mark,
	  extract: extract,
	  refer: refer
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var helpers = __webpack_require__(33);
	var mark = helpers.mark;
	var extract = helpers.extract;
	var refer = helpers.refer;
	var options= __webpack_require__(32);

	module.exports = function serialize(Immutable, refs, customReplacer, customReviver) {
	  function replacer(key, value) {
	    if (value instanceof Immutable.Record) return refer(value, 'ImmutableRecord', 'toObject', refs);
	    if (value instanceof Immutable.Range) return extract(value, 'ImmutableRange');
	    if (value instanceof Immutable.Repeat) return extract(value, 'ImmutableRepeat');
	    if (Immutable.OrderedMap.isOrderedMap(value)) return mark(value, 'ImmutableOrderedMap', 'toObject');
	    if (Immutable.Map.isMap(value)) return mark(value, 'ImmutableMap', 'toObject');
	    if (Immutable.List.isList(value)) return mark(value, 'ImmutableList', 'toArray');
	    if (Immutable.OrderedSet.isOrderedSet(value)) return mark(value, 'ImmutableOrderedSet', 'toArray');
	    if (Immutable.Set.isSet(value)) return mark(value, 'ImmutableSet', 'toArray');
	    if (Immutable.Seq.isSeq(value)) return mark(value, 'ImmutableSeq', 'toArray');
	    if (Immutable.Stack.isStack(value)) return mark(value, 'ImmutableStack', 'toArray');
	    return value;
	  }

	  function reviver(key, value) {
	    if (typeof value === 'object' && value !== null && '__serializedType__'  in value) {
	      var data = value.data;
	      switch (value.__serializedType__) {
	        case 'ImmutableMap': return Immutable.Map(data);
	        case 'ImmutableOrderedMap': return Immutable.OrderedMap(data);
	        case 'ImmutableList': return Immutable.List(data);
	        case 'ImmutableRange': return Immutable.Range(data._start, data._end, data._step);
	        case 'ImmutableRepeat': return Immutable.Repeat(data._value, data.size);
	        case 'ImmutableSet': return Immutable.Set(data);
	        case 'ImmutableOrderedSet': return Immutable.OrderedSet(data);
	        case 'ImmutableSeq': return Immutable.Seq(data);
	        case 'ImmutableStack': return Immutable.Stack(data);
	        case 'ImmutableRecord':
	          return refs && refs[value.__serializedRef__]
	            ? new refs[value.__serializedRef__](data)
	            : Immutable.Map(data);
	        default: return data;
	      }
	    }
	    return value;
	  }

	  return {
	    replacer: customReplacer
	      ? function(key, value) {
	        return customReplacer(key, value, replacer);
	      }
	      : replacer,
	    reviver: customReviver
	      ? function(key, value) {
	        return customReviver(key, value, reviver);
	      }
	      : reviver,
	    options: options
	  }
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.generateId = generateId;
	exports.getMethods = getMethods;
	exports.getActionsArray = getActionsArray;
	exports.evalAction = evalAction;
	exports.evalMethod = evalMethod;
	exports.stringify = stringify;
	exports.getSeralizeParameter = getSeralizeParameter;

	var _getParams = __webpack_require__(22);

	var _getParams2 = _interopRequireDefault(_getParams);

	var _jsan = __webpack_require__(4);

	var _jsan2 = _interopRequireDefault(_jsan);

	var _nonSecure = __webpack_require__(29);

	var _nonSecure2 = _interopRequireDefault(_nonSecure);

	var _serialize = __webpack_require__(34);

	var _serialize2 = _interopRequireDefault(_serialize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateId(id) {
	  return id || (0, _nonSecure2.default)(7);
	}

	function flatTree(obj) {
	  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  var functions = [];
	  Object.keys(obj).forEach(function (key) {
	    var prop = obj[key];
	    if (typeof prop === 'function') {
	      functions.push({
	        name: namespace + (key || prop.name || 'anonymous'),
	        func: prop,
	        args: (0, _getParams2.default)(prop)
	      });
	    } else if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
	      functions = functions.concat(flatTree(prop, namespace + key + '.'));
	    }
	  });
	  return functions;
	}

	function getMethods(obj) {
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return undefined;
	  var functions = void 0;
	  var m = void 0;
	  if (obj.__proto__) m = obj.__proto__.__proto__;
	  if (!m) m = obj;

	  Object.getOwnPropertyNames(m).forEach(function (key) {
	    var propDescriptor = Object.getOwnPropertyDescriptor(m, key);
	    if (!propDescriptor || 'get' in propDescriptor || 'set' in propDescriptor) return;
	    var prop = m[key];
	    if (typeof prop === 'function' && key !== 'constructor') {
	      if (!functions) functions = [];
	      functions.push({
	        name: key || prop.name || 'anonymous',
	        args: (0, _getParams2.default)(prop)
	      });
	    }
	  });
	  return functions;
	}

	function getActionsArray(actionCreators) {
	  if (Array.isArray(actionCreators)) return actionCreators;
	  return flatTree(actionCreators);
	}

	/* eslint-disable no-new-func */
	var interpretArg = function interpretArg(arg) {
	  return new Function('return ' + arg)();
	};

	function evalArgs(inArgs, restArgs) {
	  var args = inArgs.map(interpretArg);
	  if (!restArgs) return args;
	  var rest = interpretArg(restArgs);
	  if (Array.isArray(rest)) return args.concat.apply(args, rest);
	  throw new Error('rest must be an array');
	}

	function evalAction(action, actionCreators) {
	  if (typeof action === 'string') {
	    return new Function('return ' + action)();
	  }

	  var actionCreator = actionCreators[action.selected].func;
	  var args = evalArgs(action.args, action.rest);
	  return actionCreator.apply(undefined, args);
	}

	function evalMethod(action, obj) {
	  if (typeof action === 'string') {
	    return new Function('return ' + action).call(obj);
	  }

	  var args = evalArgs(action.args, action.rest);
	  return new Function('args', 'return this.' + action.name + '(args)').apply(obj, args);
	}
	/* eslint-enable */

	function tryCatchStringify(obj) {
	  try {
	    return JSON.stringify(obj);
	  } catch (err) {
	    /* eslint-disable no-console */
	    if (true) console.log('Failed to stringify', err);
	    /* eslint-enable no-console */
	    return _jsan2.default.stringify(obj, null, null, { circular: '[CIRCULAR]' });
	  }
	}

	function stringify(obj, serialize) {
	  if (typeof serialize === 'undefined') {
	    return tryCatchStringify(obj);
	  }
	  if (serialize === true) {
	    return _jsan2.default.stringify(obj, function (key, value) {
	      if (value && typeof value.toJS === 'function') return value.toJS();
	      return value;
	    }, null, true);
	  }
	  return _jsan2.default.stringify(obj, serialize.replacer, null, serialize.options);
	}

	function getSeralizeParameter(config, param) {
	  var serialize = config.serialize;
	  if (serialize) {
	    if (serialize === true) return { options: true };
	    if (serialize.immutable) {
	      return {
	        replacer: (0, _serialize2.default)(serialize.immutable, serialize.refs).replacer,
	        options: serialize.options || true
	      };
	    }
	    if (!serialize.replacer) return { options: serialize.options };
	    return { replacer: serialize.replacer, options: serialize.options || true };
	  }

	  var value = config[param];
	  if (typeof value === 'undefined') return undefined;
	  console.warn('`' + param + '` parameter for Redux DevTools Extension is deprecated. Use `serialize` parameter instead: https://github.com/zalmoxisus/redux-devtools-extension/releases/tag/v2.12.1'); // eslint-disable-line

	  if (typeof serializeState === 'boolean') return { options: value };
	  if (typeof serializeState === 'function') return { replacer: value };
	  return value;
	}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var defaultSocketOptions = exports.defaultSocketOptions = {
	  secure: true,
	  hostname: 'remotedev.io',
	  port: 443,
	  autoReconnect: true,
	  autoReconnectOptions: {
	    randomness: 60000
	  }
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.send = undefined;
	exports.extractState = extractState;
	exports.generateId = generateId;
	exports.start = start;
	exports.connect = connect;
	exports.connectViaExtension = connectViaExtension;

	var _jsan = __webpack_require__(4);

	var _socketclusterClient = __webpack_require__(43);

	var _socketclusterClient2 = _interopRequireDefault(_socketclusterClient);

	var _rnHostDetect = __webpack_require__(39);

	var _rnHostDetect2 = _interopRequireDefault(_rnHostDetect);

	var _constants = __webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = undefined;
	var channel = undefined;
	var listeners = {};

	function extractState(message) {
	  if (!message || !message.state) return undefined;
	  if (typeof message.state === 'string') return (0, _jsan.parse)(message.state);
	  return message.state;
	}

	function generateId() {
	  return Math.random().toString(36).substr(2);
	}

	function handleMessages(message) {
	  if (!message.payload) message.payload = message.action;
	  Object.keys(listeners).forEach(function (id) {
	    if (message.instanceId && id !== message.instanceId) return;
	    if (typeof listeners[id] === 'function') listeners[id](message);else listeners[id].forEach(function (fn) {
	      fn(message);
	    });
	  });
	}

	function watch() {
	  if (channel) return;
	  socket.emit('login', 'master', function (err, channelName) {
	    if (err) {
	      console.log(err);return;
	    }
	    channel = socket.subscribe(channelName);
	    channel.watch(handleMessages);
	    socket.on(channelName, handleMessages);
	  });
	}

	function connectToServer(options) {
	  if (socket) return;
	  var socketOptions = undefined;
	  if (options.port) {
	    socketOptions = {
	      port: options.port,
	      hostname: (0, _rnHostDetect2.default)(options.hostname || 'localhost'),
	      secure: !!options.secure
	    };
	  } else socketOptions = _constants.defaultSocketOptions;
	  socket = _socketclusterClient2.default.create(socketOptions);
	  watch();
	}

	function start(options) {
	  if (options) {
	    if (options.port && !options.hostname) {
	      options.hostname = 'localhost';
	    }
	  }
	  connectToServer(options);
	}

	function transformAction(action, config) {
	  if (action.action) return action;
	  var liftedAction = { timestamp: Date.now() };
	  if (action) {
	    if (config.getActionType) liftedAction.action = config.getActionType(action);else {
	      if (typeof action === 'string') liftedAction.action = { type: action };else if (!action.type) liftedAction.action = { type: 'update' };else liftedAction.action = action;
	    }
	  } else {
	    liftedAction.action = { type: action };
	  }
	  return liftedAction;
	}

	function _send(action, state, options, type, instanceId) {
	  start(options);
	  setTimeout(function () {
	    var message = {
	      payload: state ? (0, _jsan.stringify)(state) : '',
	      action: type === 'ACTION' ? (0, _jsan.stringify)(transformAction(action, options)) : action,
	      type: type || 'ACTION',
	      id: socket.id,
	      instanceId: instanceId,
	      name: options.name
	    };
	    socket.emit(socket.id ? 'log' : 'log-noid', message);
	  }, 0);
	}

	exports.send = _send;
	function connect() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var id = generateId(options.instanceId);
	  start(options);
	  return {
	    init: function init(state, action) {
	      _send(action || {}, state, options, 'INIT', id);
	    },
	    subscribe: function subscribe(listener) {
	      if (!listener) return undefined;
	      if (!listeners[id]) listeners[id] = [];
	      listeners[id].push(listener);

	      return function unsubscribe() {
	        var index = listeners[id].indexOf(listener);
	        listeners[id].splice(index, 1);
	      };
	    },
	    unsubscribe: function unsubscribe() {
	      delete listeners[id];
	    },
	    send: function send(action, payload) {
	      if (action) {
	        _send(action, payload, options, 'ACTION', id);
	      } else {
	        _send(undefined, payload, options, 'STATE', id);
	      }
	    },
	    error: function error(payload) {
	      socket.emit({ type: 'ERROR', payload: payload, id: socket.id, instanceId: id });
	    }
	  };
	}

	function connectViaExtension(options) {
	  if (options && options.remote || typeof window === 'undefined' || !window.__REDUX_DEVTOOLS_EXTENSION__) {
	    return connect(options);
	  }
	  return window.__REDUX_DEVTOOLS_EXTENSION__.connect(options);
	}

	exports.default = { connect: connect, connectViaExtension: connectViaExtension, send: _send, extractState: extractState, generateId: generateId };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(37);

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict'

	/*
	 * It only for Debug Remotely mode for Android
	 * When __DEV__ === false, we can't use window.require('NativeModules')
	 */
	function getByRemoteConfig(hostname) {
	  var remoteModuleConfig = typeof window !== 'undefined' &&
	    window.__fbBatchedBridgeConfig &&
	    window.__fbBatchedBridgeConfig.remoteModuleConfig
	  if (
	    !Array.isArray(remoteModuleConfig) ||
	    hostname !== 'localhost' && hostname !== '127.0.0.1'
	  ) return { hostname: hostname, passed: false }

	  var constants = (
	    remoteModuleConfig.find(getConstants) || []
	  )[1]
	  if (constants) {
	    var serverHost = constants.ServerHost || hostname
	    return { hostname: serverHost.split(':')[0], passed: true }
	  }
	  return { hostname: hostname, passed: false }
	}

	function getConstants(config) {
	  return config && (config[0] === 'AndroidConstants' || config[0] === 'PlatformConstants')
	}

	function getByRNRequirePolyfill(hostname) {
	  var originalWarn = console.warn
	  console.warn = function() {
	    if (arguments[0] && arguments[0].indexOf('Requiring module \'NativeModules\' by name') > -1) return
	    return originalWarn.apply(console, arguments)
	  }

	  var NativeModules
	  var PlatformConstants
	  var AndroidConstants
	  if (
	    typeof window === 'undefined' ||
	    !window.__DEV__ ||
	    typeof window.require !== 'function' ||
	    // RN >= 0.56
	    // TODO: Get NativeModules for RN >= 0.56
	    window.require.name === 'metroRequire'
	  ) {
	    return hostname
	  }
	  NativeModules = window.require('NativeModules')
	  console.warn = originalWarn
	  if (
	    !NativeModules ||
	    (!NativeModules.PlatformConstants && !NativeModules.AndroidConstants)
	  ) {
	    return hostname
	  }
	  PlatformConstants = NativeModules.PlatformConstants
	  AndroidConstants = NativeModules.AndroidConstants

	  var serverHost = (PlatformConstants ?
	    PlatformConstants.ServerHost :
	    AndroidConstants.ServerHost
	  ) || hostname
	  return serverHost.split(':')[0]
	}

	/*
	 * Get React Native server IP if hostname is `localhost`
	 * On Android emulator, the IP of host is `10.0.2.2` (Genymotion: 10.0.3.2)
	 */
	module.exports = function (hostname) {
	  // Check if it in React Native environment
	  if (
	    typeof __fbBatchedBridge !== 'object' ||
	    hostname !== 'localhost' && hostname !== '127.0.0.1'
	  ) {
	    return hostname
	  }
	  var result = getByRemoteConfig(hostname)

	  // Leave if get hostname by remote config successful
	  if (result.passed) {
	    return result.hostname
	  }

	  // Otherwise, use RN's require polyfill
	  return getByRNRequirePolyfill(hostname)
	}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(2);

	var SCChannel = function (name, client, options) {
	  var self = this;

	  Emitter.call(this);

	  this.PENDING = 'pending';
	  this.SUBSCRIBED = 'subscribed';
	  this.UNSUBSCRIBED = 'unsubscribed';

	  this.name = name;
	  this.state = this.UNSUBSCRIBED;
	  this.client = client;

	  this.options = options || {};
	  this.setOptions(this.options);
	};

	SCChannel.prototype = Object.create(Emitter.prototype);

	SCChannel.prototype.setOptions = function (options) {
	  if (!options) {
	    options = {};
	  }
	  this.waitForAuth = options.waitForAuth || false;
	  this.batch = options.batch || false;

	  if (options.data !== undefined) {
	    this.data = options.data;
	  }
	};

	SCChannel.prototype.getState = function () {
	  return this.state;
	};

	SCChannel.prototype.subscribe = function (options) {
	  this.client.subscribe(this.name, options);
	};

	SCChannel.prototype.unsubscribe = function () {
	  this.client.unsubscribe(this.name);
	};

	SCChannel.prototype.isSubscribed = function (includePending) {
	  return this.client.isSubscribed(this.name, includePending);
	};

	SCChannel.prototype.publish = function (data, callback) {
	  this.client.publish(this.name, data, callback);
	};

	SCChannel.prototype.watch = function (handler) {
	  this.client.watch(this.name, handler);
	};

	SCChannel.prototype.unwatch = function (handler) {
	  this.client.unwatch(this.name, handler);
	};

	SCChannel.prototype.watchers = function () {
	  return this.client.watchers(this.name);
	};

	SCChannel.prototype.destroy = function () {
	  this.client.destroyChannel(this.name);
	};

	module.exports.SCChannel = SCChannel;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	// Based on https://github.com/dscape/cycle/blob/master/cycle.js

	module.exports = function decycle(object) {
	// Make a deep copy of an object or array, assuring that there is at most
	// one instance of each object or array in the resulting structure. The
	// duplicate references (which might be forming cycles) are replaced with
	// an object of the form
	//      {$ref: PATH}
	// where the PATH is a JSONPath string that locates the first occurance.
	// So,
	//      var a = [];
	//      a[0] = a;
	//      return JSON.stringify(JSON.decycle(a));
	// produces the string '[{"$ref":"$"}]'.

	// JSONPath is used to locate the unique object. $ indicates the top level of
	// the object or array. [NUMBER] or [STRING] indicates a child member or
	// property.

	    var objects = [],   // Keep a reference to each unique object or array
	        paths = [];     // Keep the path to each unique object or array

	    return (function derez(value, path) {

	// The derez recurses through the object, producing the deep copy.

	        var i,          // The loop counter
	            name,       // Property name
	            nu;         // The new object or array

	// typeof null === 'object', so go on if this value is really an object but not
	// one of the weird builtin objects.

	        if (typeof value === 'object' && value !== null &&
	                !(value instanceof Boolean) &&
	                !(value instanceof Date)    &&
	                !(value instanceof Number)  &&
	                !(value instanceof RegExp)  &&
	                !(value instanceof String)) {

	// If the value is an object or array, look to see if we have already
	// encountered it. If so, return a $ref/path object. This is a hard way,
	// linear search that will get slower as the number of unique objects grows.

	            for (i = 0; i < objects.length; i += 1) {
	                if (objects[i] === value) {
	                    return {$ref: paths[i]};
	                }
	            }

	// Otherwise, accumulate the unique value and its path.

	            objects.push(value);
	            paths.push(path);

	// If it is an array, replicate the array.

	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                nu = [];
	                for (i = 0; i < value.length; i += 1) {
	                    nu[i] = derez(value[i], path + '[' + i + ']');
	                }
	            } else {

	// If it is an object, replicate the object.

	                nu = {};
	                for (name in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, name)) {
	                        nu[name] = derez(value[name],
	                            path + '[' + JSON.stringify(name) + ']');
	                    }
	                }
	            }
	            return nu;
	        }
	        return value;
	    }(object, '$'));
	};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var validJSONStartRegex = /^[ \n\r\t]*[{\[]/;

	var arrayBufferToBase64 = function (arraybuffer) {
	  var bytes = new Uint8Array(arraybuffer);
	  var len = bytes.length;
	  var base64 = '';

	  for (var i = 0; i < len; i += 3) {
	    base64 += base64Chars[bytes[i] >> 2];
	    base64 += base64Chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	    base64 += base64Chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	    base64 += base64Chars[bytes[i + 2] & 63];
	  }

	  if ((len % 3) === 2) {
	    base64 = base64.substring(0, base64.length - 1) + '=';
	  } else if (len % 3 === 1) {
	    base64 = base64.substring(0, base64.length - 2) + '==';
	  }

	  return base64;
	};

	var binaryToBase64Replacer = function (key, value) {
	  if (global.ArrayBuffer && value instanceof global.ArrayBuffer) {
	    return {
	      base64: true,
	      data: arrayBufferToBase64(value)
	    };
	  } else if (global.Buffer) {
	    if (value instanceof global.Buffer){
	      return {
	        base64: true,
	        data: value.toString('base64')
	      };
	    }
	    // Some versions of Node.js convert Buffers to Objects before they are passed to
	    // the replacer function - Because of this, we need to rehydrate Buffers
	    // before we can convert them to base64 strings.
	    if (value && value.type === 'Buffer' && Array.isArray(value.data)) {
	      var rehydratedBuffer;
	      if (global.Buffer.from) {
	        rehydratedBuffer = global.Buffer.from(value.data);
	      } else {
	        rehydratedBuffer = new global.Buffer(value.data);
	      }
	      return {
	        base64: true,
	        data: rehydratedBuffer.toString('base64')
	      };
	    }
	  }
	  return value;
	};

	// Decode the data which was transmitted over the wire to a JavaScript Object in a format which SC understands.
	// See encode function below for more details.
	module.exports.decode = function (input) {
	  if (input == null) {
	   return null;
	  }
	  // Leave ping or pong message as is
	  if (input === '#1' || input === '#2') {
	    return input;
	  }
	  var message = input.toString();

	  // Performance optimization to detect invalid JSON packet sooner.
	  if (!validJSONStartRegex.test(message)) {
	    return message;
	  }

	  try {
	    return JSON.parse(message);
	  } catch (err) {}
	  return message;
	};

	// Encode a raw JavaScript object (which is in the SC protocol format) into a format for
	// transfering it over the wire. In this case, we just convert it into a simple JSON string.
	// If you want to create your own custom codec, you can encode the object into any format
	// (e.g. binary ArrayBuffer or string with any kind of compression) so long as your decode
	// function is able to rehydrate that object back into its original JavaScript Object format
	// (which adheres to the SC protocol).
	// See https://github.com/SocketCluster/socketcluster/blob/master/socketcluster-protocol.md
	// for details about the SC protocol.
	module.exports.encode = function (object) {
	  // Leave ping or pong message as is
	  if (object === '#1' || object === '#2') {
	    return object;
	  }
	  return JSON.stringify(object, binaryToBase64Replacer);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var SCClientSocket = __webpack_require__(12);
	var factory = __webpack_require__(45);

	module.exports.factory = factory;
	module.exports.SCClientSocket = SCClientSocket;

	module.exports.Emitter = __webpack_require__(2);

	module.exports.create = function (options) {
	  return factory.create(options);
	};

	module.exports.connect = module.exports.create;

	module.exports.destroy = function (socket) {
	  return factory.destroy(socket);
	};

	module.exports.clients = factory.clients;

	module.exports.version = '13.0.1';


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var AuthEngine = function () {
	  this._internalStorage = {};
	  this.isLocalStorageEnabled = this._checkLocalStorageEnabled();
	};

	AuthEngine.prototype._checkLocalStorageEnabled = function () {
	  var err;
	  try {
	    // Some browsers will throw an error here if localStorage is disabled.
	    global.localStorage;

	    // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
	    // throw QuotaExceededError. We're going to detect this and avoid hard to debug edge cases.
	    global.localStorage.setItem('__scLocalStorageTest', 1);
	    global.localStorage.removeItem('__scLocalStorageTest');
	  } catch (e) {
	    err = e;
	  }
	  return !err;
	};

	AuthEngine.prototype.saveToken = function (name, token, options, callback) {
	  if (this.isLocalStorageEnabled && global.localStorage) {
	    global.localStorage.setItem(name, token);
	  } else {
	    this._internalStorage[name] = token;
	  }
	  callback && callback(null, token);
	};

	AuthEngine.prototype.removeToken = function (name, callback) {
	  var token;

	  this.loadToken(name, function (err, authToken) {
	    token = authToken;
	  });

	  if (this.isLocalStorageEnabled && global.localStorage) {
	    global.localStorage.removeItem(name);
	  } else {
	    delete this._internalStorage[name];
	  }

	  callback && callback(null, token);
	};

	AuthEngine.prototype.loadToken = function (name, callback) {
	  var token;

	  if (this.isLocalStorageEnabled && global.localStorage) {
	    token = global.localStorage.getItem(name);
	  } else {
	    token = this._internalStorage[name] || null;
	  }
	  callback(null, token);
	};

	module.exports.AuthEngine = AuthEngine;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var SCClientSocket = __webpack_require__(12);
	var scErrors = __webpack_require__(3);
	var uuid = __webpack_require__(48);
	var InvalidArgumentsError = scErrors.InvalidArgumentsError;

	var _clients = {};

	function getMultiplexId(options) {
	  var protocolPrefix = options.secure ? 'https://' : 'http://';
	  var queryString = '';
	  if (options.query) {
	    if (typeof options.query == 'string') {
	      queryString = options.query;
	    } else {
	      var queryArray = [];
	      var queryMap = options.query;
	      for (var key in queryMap) {
	        if (queryMap.hasOwnProperty(key)) {
	          queryArray.push(key + '=' + queryMap[key]);
	        }
	      }
	      if (queryArray.length) {
	        queryString = '?' + queryArray.join('&');
	      }
	    }
	  }
	  var host;
	  if (options.host) {
	    host = options.host;
	  } else {
	    host = options.hostname + ':' + options.port;
	  }
	  return protocolPrefix + host + options.path + queryString;
	}

	function isUrlSecure() {
	  return global.location && location.protocol == 'https:';
	}

	function getPort(options, isSecureDefault) {
	  var isSecure = options.secure == null ? isSecureDefault : options.secure;
	  return options.port || (global.location && location.port ? location.port : isSecure ? 443 : 80);
	}

	function create(options) {
	  var self = this;

	  options = options || {};

	  if (options.host && !options.host.match(/[^:]+:\d{2,5}/)) {
	    throw new InvalidArgumentsError('The host option should include both' +
	      ' the hostname and the port number in the format "hostname:port"');
	  }

	  if (options.host && options.hostname) {
	    throw new InvalidArgumentsError('The host option should already include' +
	      ' the hostname and the port number in the format "hostname:port"' +
	      ' - Because of this, you should never use host and hostname options together');
	  }

	  if (options.host && options.port) {
	    throw new InvalidArgumentsError('The host option should already include' +
	      ' the hostname and the port number in the format "hostname:port"' +
	      ' - Because of this, you should never use host and port options together');
	  }

	  var isSecureDefault = isUrlSecure();

	  var opts = {
	    port: getPort(options, isSecureDefault),
	    hostname: global.location && location.hostname || 'localhost',
	    path: '/socketcluster/',
	    secure: isSecureDefault,
	    autoConnect: true,
	    autoReconnect: true,
	    autoSubscribeOnConnect: true,
	    connectTimeout: 20000,
	    ackTimeout: 10000,
	    timestampRequests: false,
	    timestampParam: 't',
	    authEngine: null,
	    authTokenName: 'socketCluster.authToken',
	    binaryType: 'arraybuffer',
	    multiplex: true,
	    pubSubBatchDuration: null,
	    cloneData: false
	  };
	  for (var i in options) {
	    if (options.hasOwnProperty(i)) {
	      opts[i] = options[i];
	    }
	  }
	  opts.clientMap = _clients;

	  if (opts.multiplex === false) {
	    opts.clientId = uuid.v4();
	    var socket = new SCClientSocket(opts);
	    _clients[opts.clientId] = socket;
	    return socket;
	  }
	  opts.clientId = getMultiplexId(opts);

	  if (_clients[opts.clientId]) {
	    if (opts.autoConnect) {
	      _clients[opts.clientId].connect();
	    }
	  } else {
	    _clients[opts.clientId] = new SCClientSocket(opts);
	  }
	  return _clients[opts.clientId];
	}

	function destroy(socket) {
	  socket.destroy();
	}

	module.exports = {
	  create: create,
	  destroy: destroy,
	  clients: _clients
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var Emitter = __webpack_require__(2);
	var Response = __webpack_require__(11).Response;
	var querystring = __webpack_require__(10);
	var WebSocket;
	var createWebSocket;

	if (global.WebSocket) {
	  WebSocket = global.WebSocket;
	  createWebSocket = function (uri, options) {
	    return new WebSocket(uri);
	  };
	} else {
	  WebSocket = __webpack_require__(47);
	  createWebSocket = function (uri, options) {
	    return new WebSocket(uri, null, options);
	  };
	}

	var scErrors = __webpack_require__(3);
	var TimeoutError = scErrors.TimeoutError;
	var BadConnectionError = scErrors.BadConnectionError;


	var SCTransport = function (authEngine, codecEngine, options) {
	  var self = this;

	  this.state = this.CLOSED;
	  this.auth = authEngine;
	  this.codec = codecEngine;
	  this.options = options;
	  this.connectTimeout = options.connectTimeout;
	  this.pingTimeout = options.ackTimeout;
	  this.pingTimeoutDisabled = !!options.pingTimeoutDisabled;
	  this.callIdGenerator = options.callIdGenerator;
	  this.authTokenName = options.authTokenName;

	  this._pingTimeoutTicker = null;
	  this._callbackMap = {};
	  this._batchSendList = [];

	  // Open the connection.

	  this.state = this.CONNECTING;
	  var uri = this.uri();

	  var wsSocket = createWebSocket(uri, this.options);
	  wsSocket.binaryType = this.options.binaryType;

	  this.socket = wsSocket;

	  wsSocket.onopen = function () {
	    self._onOpen();
	  };

	  wsSocket.onclose = function (event) {
	    var code;
	    if (event.code == null) {
	      // This is to handle an edge case in React Native whereby
	      // event.code is undefined when the mobile device is locked.
	      // TODO: This is not perfect since this condition could also apply to
	      // an abnormal close (no close control frame) which would be a 1006.
	      code = 1005;
	    } else {
	      code = event.code;
	    }
	    self._onClose(code, event.reason);
	  };

	  wsSocket.onmessage = function (message, flags) {
	    self._onMessage(message.data);
	  };

	  wsSocket.onerror = function (error) {
	    // The onclose event will be called automatically after the onerror event
	    // if the socket is connected - Otherwise, if it's in the middle of
	    // connecting, we want to close it manually with a 1006 - This is necessary
	    // to prevent inconsistent behavior when running the client in Node.js
	    // vs in a browser.

	    if (self.state === self.CONNECTING) {
	      self._onClose(1006);
	    }
	  };

	  this._connectTimeoutRef = setTimeout(function () {
	    self._onClose(4007);
	    self.socket.close(4007);
	  }, this.connectTimeout);
	};

	SCTransport.prototype = Object.create(Emitter.prototype);

	SCTransport.CONNECTING = SCTransport.prototype.CONNECTING = 'connecting';
	SCTransport.OPEN = SCTransport.prototype.OPEN = 'open';
	SCTransport.CLOSED = SCTransport.prototype.CLOSED = 'closed';

	SCTransport.prototype.uri = function () {
	  var query = this.options.query || {};
	  var schema = this.options.secure ? 'wss' : 'ws';

	  if (this.options.timestampRequests) {
	    query[this.options.timestampParam] = (new Date()).getTime();
	  }

	  query = querystring.encode(query);

	  if (query.length) {
	    query = '?' + query;
	  }

	  var host;
	  if (this.options.host) {
	    host = this.options.host;
	  } else {
	    var port = '';

	    if (this.options.port && ((schema == 'wss' && this.options.port != 443)
	      || (schema == 'ws' && this.options.port != 80))) {
	      port = ':' + this.options.port;
	    }
	    host = this.options.hostname + port;
	  }

	  return schema + '://' + host + this.options.path + query;
	};

	SCTransport.prototype._onOpen = function () {
	  var self = this;

	  clearTimeout(this._connectTimeoutRef);
	  this._resetPingTimeout();

	  this._handshake(function (err, status) {
	    if (err) {
	      var statusCode;
	      if (status && status.code) {
	        statusCode = status.code;
	      } else {
	        statusCode = 4003;
	      }
	      self._onError(err);
	      self._onClose(statusCode, err.toString());
	      self.socket.close(statusCode);
	    } else {
	      self.state = self.OPEN;
	      Emitter.prototype.emit.call(self, 'open', status);
	      self._resetPingTimeout();
	    }
	  });
	};

	SCTransport.prototype._handshake = function (callback) {
	  var self = this;
	  this.auth.loadToken(this.authTokenName, function (err, token) {
	    if (err) {
	      callback(err);
	    } else {
	      // Don't wait for this.state to be 'open'.
	      // The underlying WebSocket (this.socket) is already open.
	      var options = {
	        force: true
	      };
	      self.emit('#handshake', {
	        authToken: token
	      }, options, function (err, status) {
	        if (status) {
	          // Add the token which was used as part of authentication attempt
	          // to the status object.
	          status.authToken = token;
	          if (status.authError) {
	            status.authError = scErrors.hydrateError(status.authError);
	          }
	        }
	        callback(err, status);
	      });
	    }
	  });
	};

	SCTransport.prototype._abortAllPendingEventsDueToBadConnection = function (failureType) {
	  for (var i in this._callbackMap) {
	    if (this._callbackMap.hasOwnProperty(i)) {
	      var eventObject = this._callbackMap[i];
	      delete this._callbackMap[i];

	      clearTimeout(eventObject.timeout);
	      delete eventObject.timeout;

	      var errorMessage = "Event '" + eventObject.event +
	        "' was aborted due to a bad connection";
	      var badConnectionError = new BadConnectionError(errorMessage, failureType);

	      var callback = eventObject.callback;
	      delete eventObject.callback;
	      callback.call(eventObject, badConnectionError, eventObject);
	    }
	  }
	};

	SCTransport.prototype._onClose = function (code, data) {
	  delete this.socket.onopen;
	  delete this.socket.onclose;
	  delete this.socket.onmessage;
	  delete this.socket.onerror;

	  clearTimeout(this._connectTimeoutRef);
	  clearTimeout(this._pingTimeoutTicker);
	  clearTimeout(this._batchTimeout);

	  if (this.state == this.OPEN) {
	    this.state = this.CLOSED;
	    Emitter.prototype.emit.call(this, 'close', code, data);
	    this._abortAllPendingEventsDueToBadConnection('disconnect');

	  } else if (this.state == this.CONNECTING) {
	    this.state = this.CLOSED;
	    Emitter.prototype.emit.call(this, 'openAbort', code, data);
	    this._abortAllPendingEventsDueToBadConnection('connectAbort');
	  }
	};

	SCTransport.prototype._handleEventObject = function (obj, message) {
	  if (obj && obj.event != null) {
	    var response = new Response(this, obj.cid);
	    Emitter.prototype.emit.call(this, 'event', obj.event, obj.data, response);
	  } else if (obj && obj.rid != null) {
	    var eventObject = this._callbackMap[obj.rid];
	    if (eventObject) {
	      clearTimeout(eventObject.timeout);
	      delete eventObject.timeout;
	      delete this._callbackMap[obj.rid];

	      if (eventObject.callback) {
	        var rehydratedError = scErrors.hydrateError(obj.error);
	        eventObject.callback(rehydratedError, obj.data);
	      }
	    }
	  } else {
	    Emitter.prototype.emit.call(this, 'event', 'raw', message);
	  }
	};

	SCTransport.prototype._onMessage = function (message) {
	  Emitter.prototype.emit.call(this, 'event', 'message', message);

	  var obj = this.decode(message);

	  // If ping
	  if (obj == '#1') {
	    this._resetPingTimeout();
	    if (this.socket.readyState == this.socket.OPEN) {
	      this.sendObject('#2');
	    }
	  } else {
	    if (Array.isArray(obj)) {
	      var len = obj.length;
	      for (var i = 0; i < len; i++) {
	        this._handleEventObject(obj[i], message);
	      }
	    } else {
	      this._handleEventObject(obj, message);
	    }
	  }
	};

	SCTransport.prototype._onError = function (err) {
	  Emitter.prototype.emit.call(this, 'error', err);
	};

	SCTransport.prototype._resetPingTimeout = function () {
	  if (this.pingTimeoutDisabled) {
	    return;
	  }
	  var self = this;

	  var now = (new Date()).getTime();
	  clearTimeout(this._pingTimeoutTicker);

	  this._pingTimeoutTicker = setTimeout(function () {
	    self._onClose(4000);
	    self.socket.close(4000);
	  }, this.pingTimeout);
	};

	SCTransport.prototype.getBytesReceived = function () {
	  return this.socket.bytesReceived;
	};

	SCTransport.prototype.close = function (code, data) {
	  code = code || 1000;

	  if (this.state == this.OPEN) {
	    var packet = {
	      code: code,
	      data: data
	    };
	    this.emit('#disconnect', packet);

	    this._onClose(code, data);
	    this.socket.close(code);

	  } else if (this.state == this.CONNECTING) {
	    this._onClose(code, data);
	    this.socket.close(code);
	  }
	};

	SCTransport.prototype.emitObject = function (eventObject, options) {
	  var simpleEventObject = {
	    event: eventObject.event,
	    data: eventObject.data
	  };

	  if (eventObject.callback) {
	    simpleEventObject.cid = eventObject.cid = this.callIdGenerator();
	    this._callbackMap[eventObject.cid] = eventObject;
	  }

	  this.sendObject(simpleEventObject, options);

	  return eventObject.cid || null;
	};

	SCTransport.prototype._handleEventAckTimeout = function (eventObject) {
	  if (eventObject.cid) {
	    delete this._callbackMap[eventObject.cid];
	  }
	  delete eventObject.timeout;

	  var callback = eventObject.callback;
	  if (callback) {
	    delete eventObject.callback;
	    var error = new TimeoutError("Event response for '" + eventObject.event + "' timed out");
	    callback.call(eventObject, error, eventObject);
	  }
	};

	// The last two optional arguments (a and b) can be options and/or callback
	SCTransport.prototype.emit = function (event, data, a, b) {
	  var self = this;

	  var callback, options;

	  if (b) {
	    options = a;
	    callback = b;
	  } else {
	    if (a instanceof Function) {
	      options = {};
	      callback = a;
	    } else {
	      options = a;
	    }
	  }

	  var eventObject = {
	    event: event,
	    data: data,
	    callback: callback
	  };

	  if (callback && !options.noTimeout) {
	    eventObject.timeout = setTimeout(function () {
	      self._handleEventAckTimeout(eventObject);
	    }, this.options.ackTimeout);
	  }

	  var cid = null;
	  if (this.state == this.OPEN || options.force) {
	    cid = this.emitObject(eventObject, options);
	  }
	  return cid;
	};

	SCTransport.prototype.cancelPendingResponse = function (cid) {
	  delete this._callbackMap[cid];
	};

	SCTransport.prototype.decode = function (message) {
	  return this.codec.decode(message);
	};

	SCTransport.prototype.encode = function (object) {
	  return this.codec.encode(object);
	};

	SCTransport.prototype.send = function (data) {
	  if (this.socket.readyState != this.socket.OPEN) {
	    this._onClose(1005);
	  } else {
	    this.socket.send(data);
	  }
	};

	SCTransport.prototype.serializeObject = function (object) {
	  var str, formatError;
	  try {
	    str = this.encode(object);
	  } catch (err) {
	    formatError = err;
	    this._onError(formatError);
	  }
	  if (!formatError) {
	    return str;
	  }
	  return null;
	};

	SCTransport.prototype.sendObjectBatch = function (object) {
	  var self = this;

	  this._batchSendList.push(object);
	  if (this._batchTimeout) {
	    return;
	  }

	  this._batchTimeout = setTimeout(function () {
	    delete self._batchTimeout;
	    if (self._batchSendList.length) {
	      var str = self.serializeObject(self._batchSendList);
	      if (str != null) {
	        self.send(str);
	      }
	      self._batchSendList = [];
	    }
	  }, this.options.pubSubBatchDuration || 0);
	};

	SCTransport.prototype.sendObjectSingle = function (object) {
	  var str = this.serializeObject(object);
	  if (str != null) {
	    this.send(str);
	  }
	};

	SCTransport.prototype.sendObject = function (object, options) {
	  if (options && options.batch) {
	    this.sendObjectBatch(object);
	  } else {
	    this.sendObjectSingle(object);
	  }
	};

	module.exports.SCTransport = SCTransport;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	var global;
	if (typeof WorkerGlobalScope !== 'undefined') {
	  global = self;
	} else {
	  global = typeof window != 'undefined' && window || (function() { return this; })();
	}

	var WebSocket = global.WebSocket || global.MozWebSocket;

	/**
	 * WebSocket constructor.
	 *
	 * The third `opts` options object gets ignored in web browsers, since it's
	 * non-standard, and throws a TypeError if passed to the constructor.
	 * See: https://github.com/einaros/ws/issues/227
	 *
	 * @param {String} uri
	 * @param {Array} protocols (optional)
	 * @param {Object} opts (optional)
	 * @api public
	 */

	function ws(uri, protocols, opts) {
	  var instance;
	  if (protocols) {
	    instance = new WebSocket(uri, protocols);
	  } else {
	    instance = new WebSocket(uri);
	  }
	  return instance;
	}

	if (WebSocket) ws.prototype = WebSocket.prototype;

	module.exports = WebSocket ? ws : null;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var v1 = __webpack_require__(49);
	var v4 = __webpack_require__(50);

	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;

	module.exports = uuid;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var rng = __webpack_require__(14);
	var bytesToUuid = __webpack_require__(13);

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	var _nodeId;
	var _clockseq;

	// Previous uuid creation time
	var _lastMSecs = 0;
	var _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};
	  var node = options.node || _nodeId;
	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // node and clockseq need to be initialized to random values if they're not
	  // specified.  We do this lazily to minimize issues related to insufficient
	  // system entropy.  See #189
	  if (node == null || clockseq == null) {
	    var seedBytes = rng();
	    if (node == null) {
	      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	      node = _nodeId = [
	        seedBytes[0] | 0x01,
	        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
	      ];
	    }
	    if (clockseq == null) {
	      // Per 4.2.2, randomize (14 bit) clockseq
	      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
	    }
	  }

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  for (var n = 0; n < 6; ++n) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : bytesToUuid(b);
	}

	module.exports = v1;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var rng = __webpack_require__(14);
	var bytesToUuid = __webpack_require__(13);

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options === 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid(rnds);
	}

	module.exports = v4;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ })
/******/ ])
});
;
