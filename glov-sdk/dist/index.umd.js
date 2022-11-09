(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/asyncToGenerator'), require('@babel/runtime/regenerator'), require('react'), require('@babel/runtime/helpers/slicedToArray'), require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/defineProperty'), require('@babel/runtime/helpers/typeof')) :
  typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/asyncToGenerator', '@babel/runtime/regenerator', 'react', '@babel/runtime/helpers/slicedToArray', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/defineProperty', '@babel/runtime/helpers/typeof'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["glov-sdk"] = {}, global._asyncToGenerator, global._regeneratorRuntime, global.React, global._slicedToArray, global._classCallCheck, global._createClass, global._defineProperty, global._typeof));
})(this, (function (exports, _asyncToGenerator, _regeneratorRuntime, React, _slicedToArray, _classCallCheck, _createClass, _defineProperty, _typeof) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
  var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
  var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
  var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
  var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
  var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

  var replaceAll = function replaceAll(str, find) {
    var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    if (!str) return "";
    var index = str.indexOf(find);
    if (index < 0) return str;
    while (str.indexOf(find) >= 0) {
      var _index = str.indexOf(find);
      str = (_index > 0 ? str.substring(0, _index) : "") + replace + str.substring(_index + find.length);
    }
    return str;
  };

  /* eslint-disable max-len */
  // TODO revert the following staging env check after moving to new branch structure
  window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
  window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
  window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
  var MOBILE_MEDIA_QUERY = "(max-width: 440px)";
  var SESSION_STORAGE_KEYS = {
    SESSION_TIMESTAMP: "BG_SessionTimestamp",
    SESSION_HISTORY: "BG_SessionHistory",
    TREATMENTS: "BG_Treatments",
    POPUP_DISPLAY_FLAG: "BG_PopupDisplayFlag",
    SKU_INFO_BASKET: "BG_ProductInfoBasket",
    TIMEOUT_COUNT: "BG_TimeoutCount",
    SESSION_REFERRER: "BG_SessionReferrer"
  };
  var LOCAL_STORAGE_KEYS = {
    DEBUG_MODE: "BG_Debug",
    OUT_OF_SCOPE: "BG_OutOfScope",
    IS_LABEL_SENT: "BG_LabelSent",
    USER_ID: "BG_UserId_00",
    DATA_COLLECTION_DATA_SIZE: "BG_CollectionDataSize"
  };

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var glovInfoLayerInit = function glovInfoLayerInit() {
    window.glovInfoLayer = window.glovInfoLayer || {
      eRule: {},
      context: []
    };
  };
  var pushToGlovInfoLayer = function pushToGlovInfoLayer(key, value) {
    var infoLayer = window.glovInfoLayer;
    if (key.startsWith("context")) infoLayer = infoLayer.context;
    if (key.startsWith("eRule")) infoLayer = infoLayer.eRule;
    if (Array.isArray(infoLayer)) {
      infoLayer.push(_defineProperty__default["default"]({}, key.split(".")[1], value));
      return;
    }
    infoLayer[key.split(".")[1]] = value;
    return;
  };
  var getFromGlovInfoLayer = function getFromGlovInfoLayer(key) {
    var infoLayer = window.glovInfoLayer;
    if (key.startsWith("context")) infoLayer = infoLayer.context;
    if (key.startsWith("eRule")) infoLayer = infoLayer.eRule;
    if (Array.isArray(infoLayer)) {
      var _iterator = _createForOfIteratorHelper$1(infoLayer),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          if (Object.keys(entry).includes(key)) return entry[key];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      return infoLayer[key];
    }
    return null;
  };

  var Logger = /*#__PURE__*/function () {
    function Logger() {
      var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "GlovClientSDK";
      _classCallCheck__default["default"](this, Logger);
      this.origin = origin;
      this.DEBUG = window.localStorage.getItem(LOCAL_STORAGE_KEYS.DEBUG_MODE);
    }
    _createClass__default["default"](Logger, [{
      key: "info",
      value: function info() {
        var _console;
        var origin = this.origin;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_console = console).info.apply(_console, ["[".concat(origin, "]")].concat(args));
      }
    }, {
      key: "log",
      value: function log() {
        var DEBUG = this.DEBUG,
          origin = this.origin;
        if (DEBUG) {
          var _console2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          (_console2 = console).log.apply(_console2, ["[".concat(origin, "]")].concat(args));
        }
      }
    }, {
      key: "failed",
      value: function failed() {
        var _console3;
        var DEBUG = this.DEBUG,
          origin = this.origin;
        if (!DEBUG) return;
        var messageConfig = "%c%s   ";
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        args.forEach(function (argument) {
          var type = _typeof__default["default"](argument);
          switch (type) {
            case "bigint":
            case "number":
            case "boolean":
              messageConfig += "%d   ";
              break;
            case "string":
              messageConfig += "%s   ";
              break;
            case "object":
            case "undefined":
            default:
              messageConfig += "%o   ";
          }
        });
        (_console3 = console).log.apply(_console3, [messageConfig, "color: red", "[".concat(origin, "]")].concat(args));
      }
    }, {
      key: "success",
      value: function success() {
        var _console4;
        var DEBUG = this.DEBUG,
          origin = this.origin;
        if (!DEBUG) return;
        var messageConfig = "%c%s   ";
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        args.forEach(function (argument) {
          var type = _typeof__default["default"](argument);
          switch (type) {
            case "bigint":
            case "number":
            case "boolean":
              messageConfig += "%d   ";
              break;
            case "string":
              messageConfig += "%s   ";
              break;
            case "object":
            case "undefined":
            default:
              messageConfig += "%o   ";
          }
        });
        (_console4 = console).log.apply(_console4, [messageConfig, "color: green", "[".concat(origin, "]")].concat(args));
      }
    }, {
      key: "warn",
      value: function warn() {
        var _console5;
        var origin = this.origin;
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
        (_console5 = console).warn.apply(_console5, ["[".concat(origin, "]")].concat(args));
      }
    }, {
      key: "error",
      value: function error() {
        var _console6;
        var origin = this.origin;
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }
        (_console6 = console).error.apply(_console6, ["[".concat(origin, "]")].concat(args));
      }
    }]);
    return Logger;
  }();

  var logger$8 = new Logger("BeagleUtils");
  var conditionChecker = function conditionChecker(runTimeValue, condition, value) {
    if (condition === "notExist") {
      if (!runTimeValue) {
        logger$8.success("conditionChecker: -satisfied- target does not exist");
        return true;
      }
      logger$8.failed("conditionChecker: -not satisfied- target does exist");
      return false;
    }
    if (runTimeValue === null || runTimeValue === undefined || condition === null || condition === undefined) {
      logger$8.failed("conditionChecker: runTimeValue or condition is not defined");
      return false;
    }
    switch (condition) {
      case "exist":
        if (runTimeValue) {
          logger$8.success("conditionChecker: -satisfied- target does exist");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target does not exist");
        return false;
      case "includes":
      case "contains":
        if (runTimeValue.includes(value)) {
          logger$8.success("conditionChecker: -satisfied- target contains value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target does not contain value");
        return false;
      case "notIncludes":
      case "notContains":
        if (!runTimeValue.includes(value)) {
          logger$8.success("conditionChecker: -satisfied- target does not contain value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target contains value");
        return false;
      case "equal":
        if (runTimeValue === value) {
          logger$8.success("conditionChecker: -satisfied- target equals value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target does not equal value");
        return false;
      case "notEqual":
        if (runTimeValue !== value) {
          logger$8.success("conditionChecker: -satisfied- target does not equal value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target equals value");
        return false;
      case "greaterThan":
        if (runTimeValue > value) {
          logger$8.success("conditionChecker: -satisfied- target is greater than value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target is not greater than value");
        return false;
      case "lessThan":
        if (runTimeValue < value) {
          logger$8.success("conditionChecker: -satisfied- target is less than value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target is not less than value");
        return false;
      case "greaterEquals":
        if (runTimeValue >= value) {
          logger$8.success("conditionChecker: -satisfied- target is greater or equal than value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target is not greater or equal than value");
        return false;
      case "lessEquals":
        if (runTimeValue <= value) {
          logger$8.success("conditionChecker: -satisfied- target is less or equal than value");
          return true;
        }
        logger$8.failed("conditionChecker: -not satisfied- target is not less or equal than value");
        return false;
      case "between":
        {
          var _value$split = value.split(","),
            _value$split2 = _slicedToArray__default["default"](_value$split, 2),
            min = _value$split2[0],
            max = _value$split2[1];
          min = parseInt(min);
          max = parseInt(max);
          if (runTimeValue >= min && runTimeValue <= max) {
            logger$8.success("conditionChecker: -satisfied- target is between min and max");
            return true;
          }
          logger$8.failed("conditionChecker: -not satisfied- target is not between min and max");
          return false;
        }
      case "regex":
        {
          var regex = new RegExp(value, "i");
          return regex.test(runTimeValue);
        }
      default:
        logger$8.failed("conditionChecker: condition is not defined ", condition);
        return false;
    }
  };

  var logger$7 = new Logger("BeagleInfoLayerChecker");
  var checkDataLayerRule = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(rule) {
      var operator, condition, value, runtimeValue;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger$7.log("Checking rule", JSON.stringify(rule));
              operator = rule.operator, condition = rule.condition, value = rule.value;
              _context.next = 4;
              return dataLayerFinder(operator);
            case 4:
              runtimeValue = _context.sent;
              return _context.abrupt("return", conditionChecker(runtimeValue, condition, value));
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function checkDataLayerRule(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var dataLayerFinder = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(key) {
      var res;
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              logger$7.log("Searching beagleInfoLayer for key ", key);
              _context2.next = 3;
              return getFromGlovInfoLayer(key);
            case 3:
              res = _context2.sent;
              if (!(res !== null && res !== undefined)) {
                _context2.next = 7;
                break;
              }
              logger$7.success("Found key ".concat(key, " with value ").concat(res));
              return _context2.abrupt("return", res);
            case 7:
              logger$7.failed("Key ".concat(key, " not found in beagleInfoLayer"));
              return _context2.abrupt("return", null);
            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function dataLayerFinder(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var logger$6 = new Logger("BeagleElementChecker");
  var checkElementRule = function checkElementRule(rule) {
    logger$6.log("Checking rule", JSON.stringify(rule));
    var operator = rule.operator,
      condition = rule.condition,
      value = rule.value,
      selector = rule.selector,
      selectorAll = rule.selectorAll,
      _rule$selectorFallbac = rule.selectorFallback,
      selectorFallback = _rule$selectorFallbac === void 0 ? null : _rule$selectorFallbac;
    var mainSelector = selector;
    if (mainSelector && !window.top.document.querySelector(mainSelector)) {
      mainSelector = selectorFallback ? selectorFallback : mainSelector;
    }
    if (operator === null) {
      return conditionChecker(window.top.document.querySelector(mainSelector), condition, value);
    }
    if (mainSelector && !window.top.document.querySelector(mainSelector)) {
      logger$6.failed("Selector not found on page");
      return false;
    }
    if (selectorAll && !window.top.document.querySelectorAll(selectorAll)) {
      logger$6.failed("Selector not found on page");
      return false;
    }
    var element;
    if (mainSelector) element = window.top.document.querySelector(mainSelector);else if (selectorAll) element = Array.from(window.top.document.querySelectorAll(selectorAll));
    switch (operator) {
      case "text-number":
        {
          var tempVal;
          if (Array.isArray(element)) {
            tempVal = element.reduce(function (returnVal, elem) {
              returnVal += parseInt(elem.textContent.replace("TL", "").replace(".", ""));
              return returnVal;
            }, 0);
          } else {
            tempVal = parseInt(window.top.document.querySelector(mainSelector).textContent.replace("TL", "").replace(".", ""));
          }
          var runTimeValue = parseInt(tempVal);
          return conditionChecker(runTimeValue, condition, value);
        }
      case "classList":
        return conditionChecker(Array.from(element.classList), condition, value);
      case "count":
        {
          if (Array.isArray(element) && element.length > 0) {
            return conditionChecker(element.length, condition, value);
          } else if (element) {
            return conditionChecker(1, condition, value);
          } else {
            return conditionChecker(0, condition, value);
          }
        }
      case "style":
        {
          var elementStyles = getComputedStyle(element);
          var styleKey = value.split(":")[0].trim();
          var styleValue = value.split(":")[1].trim();
          var _runTimeValue = elementStyles[styleKey];
          return conditionChecker(_runTimeValue, condition, styleValue);
        }
      default:
        logger$6.failed("Operator not defined");
        return false;
    }
  };

  var logger$5 = new Logger("BeagleFunctionChecker");
  var checkFunctionRule = function checkFunctionRule(rule, opts) {
    logger$5.log("Checking rule", JSON.stringify(rule));
    var productInfo = opts.productInfo;
    var operator = rule.operator,
      condition = rule.condition,
      value = rule.value,
      bindings = rule.bindings;
    if (!operator) {
      logger$5.failed("Rule function not defined");
      return false;
    }
    var context = {};
    if (bindings == "productInfo") {
      context = {
        productInfo: productInfo
      };
    }
    var ruleFunction = Function(operator).bind(context);
    var runtimeValue = ruleFunction();
    return conditionChecker(runtimeValue, condition, value);
  };

  var logger$4 = new Logger("BeagleSessionChecker");
  var checkSessionRule = function checkSessionRule(rule) {
    logger$4.log("Checking rule", JSON.stringify(rule));
    var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;
    switch (operator) {
      case "duration":
        return durationHandler(condition, value);
      case "history":
        return historyHandler(condition, value);
      default:
        return null;
    }
  };
  var getSessionTimestamp = function getSessionTimestamp() {
    try {
      return new Date(parseInt(window.sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_TIMESTAMP)));
    } catch (err) {
      logger$4.failed("Could not get session timestamp", err);
      return Date.now();
    }
  };
  var durationHandler = function durationHandler(condition, value) {
    var duration = (Date.now() - getSessionTimestamp()) / 1000;
    return conditionChecker(duration, condition, parseInt(value));
  };
  var historyHandler = function historyHandler(condition, value) {
    var _window$sessionStorag;
    var currentHistory = (_window$sessionStorag = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_HISTORY)) === null || _window$sessionStorag === void 0 ? void 0 : _window$sessionStorag.split(",");
    return conditionChecker(currentHistory, condition, value);
  };

  var logger$3 = new Logger("BeagleUrlChecker");
  var checkUrlRule = function checkUrlRule(rule) {
    logger$3.log("Checking rule", JSON.stringify(rule));
    var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;
    switch (operator) {
      case "path":
        {
          var requestURL = window.top.location.href;
          var path = new URL(requestURL).pathname;
          logger$3.log("Checking path ".concat(path, " matches rule path ").concat(value));
          return conditionChecker(path, condition, value);
        }
      case "PLACEHOLDER":
        {
          return null;
        }
      default:
        return null;
    }
  };

  var logger$2 = new Logger("BeagleEnvChecker");
  var checkEnvRule = function checkEnvRule(rule) {
    logger$2.log("Checking rule", JSON.stringify(rule));
    var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;
    switch (operator) {
      case "device_type":
        {
          var isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches ? "mobile" : "desktop";
          return conditionChecker(isMobile, condition, value);
        }
      case "PLACEHOLDER":
        {
          return null;
        }
      default:
        return null;
    }
  };

  var logger$1 = new Logger("BeagleProductInfoChecker");
  var checkProductInfoRule = function checkProductInfoRule(rule, bindings) {
    var _productInfo$Object$k;
    logger$1.log("Checking rule", JSON.stringify(rule));
    var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;
    var productInfo = bindings.productInfo;
    if (!productInfo || _typeof__default["default"](productInfo) === "object" && !Object.keys(productInfo).length) return false;
    var runtimeValue = null;
    var sku = (_productInfo$Object$k = productInfo[Object.keys(productInfo)[0]]) === null || _productInfo$Object$k === void 0 ? void 0 : _productInfo$Object$k.id;
    switch (operator) {
      case "transactionIn2Weeks":
        {
          logger$1.log("Getting TransactionCount for sku ", sku);
          runtimeValue = getTransactionCount(sku, productInfo);
          break;
        }
      case "addToCartIn2Weeks":
        {
          logger$1.log("Getting AddToCartCount for sku ", sku);
          runtimeValue = getAddToCartCount(sku, productInfo);
          break;
        }
      case "productViewCount":
        {
          logger$1.log("Getting productViewCount for sku ", sku);
          runtimeValue = getPreviewCount(sku, productInfo);
          break;
        }
    }
    return conditionChecker(runtimeValue, condition, value);
  };
  var getTransactionCount = function getTransactionCount(sku, productInfo) {
    if (sku && productInfo && productInfo[sku]) {
      var _productInfo$sku, _productInfo$sku$cata;
      return (_productInfo$sku = productInfo[sku]) === null || _productInfo$sku === void 0 ? void 0 : (_productInfo$sku$cata = _productInfo$sku.catalog) === null || _productInfo$sku$cata === void 0 ? void 0 : _productInfo$sku$cata.transactionIn2Weeks;
    }
    return -1;
  };
  var getAddToCartCount = function getAddToCartCount(sku, productInfo) {
    if (sku && productInfo && productInfo[sku]) {
      var _productInfo$sku2, _productInfo$sku2$cat;
      return (_productInfo$sku2 = productInfo[sku]) === null || _productInfo$sku2 === void 0 ? void 0 : (_productInfo$sku2$cat = _productInfo$sku2.catalog) === null || _productInfo$sku2$cat === void 0 ? void 0 : _productInfo$sku2$cat.addToCartIn2Weeks;
    }
    return -1;
  };
  var getPreviewCount = function getPreviewCount(sku, productInfo) {
    if (sku && productInfo && productInfo[sku]) {
      var _productInfo$sku3, _productInfo$sku3$cat;
      return (_productInfo$sku3 = productInfo[sku]) === null || _productInfo$sku3 === void 0 ? void 0 : (_productInfo$sku3$cat = _productInfo$sku3.catalog) === null || _productInfo$sku3$cat === void 0 ? void 0 : _productInfo$sku3$cat.productViewCount;
    }
    return -1;
  };

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var logger = new Logger("GlovRuleEngine");
  var RuleEngine = /*#__PURE__*/function () {
    function RuleEngine(body) {
      _classCallCheck__default["default"](this, RuleEngine);
      var eligibilityRules = body.eligibilityRules,
        baseRuleSet = body.baseRuleSet,
        bindings = body.bindings;
      this.baseRuleSet = baseRuleSet;
      this.eligibilityRules = eligibilityRules;
      this.bindings = bindings;
    }
    _createClass__default["default"](RuleEngine, [{
      key: "checkRules",
      value: function () {
        var _checkRules = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
          var _iterator, _step, rule, ruleSatisfied;
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _iterator = _createForOfIteratorHelper(this.baseRuleSet);
                  _context.prev = 1;
                  _iterator.s();
                case 3:
                  if ((_step = _iterator.n()).done) {
                    _context.next = 12;
                    break;
                  }
                  rule = _step.value;
                  _context.next = 7;
                  return this.checkRule(rule);
                case 7:
                  ruleSatisfied = _context.sent;
                  if (ruleSatisfied) {
                    _context.next = 10;
                    break;
                  }
                  return _context.abrupt("return", false);
                case 10:
                  _context.next = 3;
                  break;
                case 12:
                  _context.next = 17;
                  break;
                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](1);
                  _iterator.e(_context.t0);
                case 17:
                  _context.prev = 17;
                  _iterator.f();
                  return _context.finish(17);
                case 20:
                  return _context.abrupt("return", true);
                case 21:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 14, 17, 20]]);
        }));
        function checkRules() {
          return _checkRules.apply(this, arguments);
        }
        return checkRules;
      }()
    }, {
      key: "checkRule",
      value: function () {
        var _checkRule = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(rule) {
          var chain, chain_condition, type, ruleSatisfied;
          return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  chain = rule.chain, chain_condition = rule.chain_condition, type = rule.type;
                  ruleSatisfied = null; // check rule
                  _context2.t0 = type;
                  _context2.next = _context2.t0 === "session" ? 5 : _context2.t0 === "element" ? 7 : _context2.t0 === "dataLayer" ? 9 : _context2.t0 === "url" ? 13 : _context2.t0 === "function" ? 15 : _context2.t0 === "environment" ? 17 : _context2.t0 === "productInfoLookup" ? 19 : 21;
                  break;
                case 5:
                  ruleSatisfied = checkSessionRule(rule);
                  return _context2.abrupt("break", 23);
                case 7:
                  ruleSatisfied = checkElementRule(rule);
                  return _context2.abrupt("break", 23);
                case 9:
                  _context2.next = 11;
                  return checkDataLayerRule(rule);
                case 11:
                  ruleSatisfied = _context2.sent;
                  return _context2.abrupt("break", 23);
                case 13:
                  ruleSatisfied = checkUrlRule(rule);
                  return _context2.abrupt("break", 23);
                case 15:
                  ruleSatisfied = checkFunctionRule(rule, this.bindings);
                  return _context2.abrupt("break", 23);
                case 17:
                  ruleSatisfied = checkEnvRule(rule);
                  return _context2.abrupt("break", 23);
                case 19:
                  ruleSatisfied = checkProductInfoRule(rule, this.bindings);
                  return _context2.abrupt("break", 23);
                case 21:
                  logger.failed("No such rule type: ".concat(type));
                  return _context2.abrupt("return", null);
                case 23:
                  if (!chain) {
                    _context2.next = 49;
                    break;
                  }
                  _context2.t1 = chain_condition;
                  _context2.next = _context2.t1 === "and" ? 27 : _context2.t1 === "or" ? 34 : _context2.t1 === "xor" ? 41 : 47;
                  break;
                case 27:
                  _context2.t2 = ruleSatisfied;
                  if (!_context2.t2) {
                    _context2.next = 32;
                    break;
                  }
                  _context2.next = 31;
                  return this.checkRule(chain);
                case 31:
                  _context2.t2 = _context2.sent;
                case 32:
                  ruleSatisfied = _context2.t2;
                  return _context2.abrupt("break", 49);
                case 34:
                  _context2.t3 = ruleSatisfied;
                  if (_context2.t3) {
                    _context2.next = 39;
                    break;
                  }
                  _context2.next = 38;
                  return this.checkRule(chain);
                case 38:
                  _context2.t3 = _context2.sent;
                case 39:
                  ruleSatisfied = _context2.t3;
                  return _context2.abrupt("break", 49);
                case 41:
                  _context2.t4 = ruleSatisfied;
                  _context2.next = 44;
                  return this.checkRule(chain);
                case 44:
                  _context2.t5 = _context2.sent;
                  ruleSatisfied = _context2.t4 !== _context2.t5;
                  return _context2.abrupt("break", 49);
                case 47:
                  logger.failed("No such chain condition");
                  return _context2.abrupt("break", 49);
                case 49:
                  return _context2.abrupt("return", ruleSatisfied);
                case 50:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
        function checkRule(_x) {
          return _checkRule.apply(this, arguments);
        }
        return checkRule;
      }()
    }, {
      key: "checkEligibilityRules",
      value: function () {
        var _checkEligibilityRules = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3() {
          var _i, _Object$entries, _Object$entries$_i, key, rules, satisfiedRuleIds, _iterator2, _step2, rule;
          return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (this.eligibilityRules) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return");
                case 2:
                  _i = 0, _Object$entries = Object.entries(this.eligibilityRules);
                case 3:
                  if (!(_i < _Object$entries.length)) {
                    _context3.next = 29;
                    break;
                  }
                  _Object$entries$_i = _slicedToArray__default["default"](_Object$entries[_i], 2), key = _Object$entries$_i[0], rules = _Object$entries$_i[1];
                  satisfiedRuleIds = [];
                  _iterator2 = _createForOfIteratorHelper(rules);
                  _context3.prev = 7;
                  _iterator2.s();
                case 9:
                  if ((_step2 = _iterator2.n()).done) {
                    _context3.next = 17;
                    break;
                  }
                  rule = _step2.value;
                  _context3.next = 13;
                  return this.checkRule(rule);
                case 13:
                  if (!_context3.sent) {
                    _context3.next = 15;
                    break;
                  }
                  satisfiedRuleIds.push(rule.name);
                case 15:
                  _context3.next = 9;
                  break;
                case 17:
                  _context3.next = 22;
                  break;
                case 19:
                  _context3.prev = 19;
                  _context3.t0 = _context3["catch"](7);
                  _iterator2.e(_context3.t0);
                case 22:
                  _context3.prev = 22;
                  _iterator2.f();
                  return _context3.finish(22);
                case 25:
                  pushToGlovInfoLayer("eRules.".concat(key), satisfiedRuleIds);
                case 26:
                  _i++;
                  _context3.next = 3;
                  break;
                case 29:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[7, 19, 22, 25]]);
        }));
        function checkEligibilityRules() {
          return _checkEligibilityRules.apply(this, arguments);
        }
        return checkEligibilityRules;
      }()
    }]);
    return RuleEngine;
  }();

  var fetchConfig = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(clientId) {
      var robotsObj, robotsTimestamp, fetchAll, elapsedHours, robotsPromise, robotWeightsPromise, eligibilityRulesPromise, _yield$Promise$all, _yield$Promise$all2, robots, robotWeights, eligibilityRules, _yield$Promise$all3, _yield$Promise$all4, robotsJson, robotWeightsJson, eligibilityRulesJson;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fetchAll = false;
              try {
                robotsObj = JSON.parse(window.localStorage.getItem("Glov_Robots"));
                robotsTimestamp = robotsObj.timestamp;
              } catch (err) {
                robotsObj = null;
                robotsTimestamp = null;
                fetchAll = true;
              }
              if (robotsObj && robotsTimestamp) {
                elapsedHours = Math.floor((Date.now() - robotsTimestamp) / (1000 * 60 * 60) % 24);
                if (elapsedHours > 1) fetchAll = true;
              } else fetchAll = true;
              if (!fetchAll) {
                _context.next = 25;
                break;
              }
              // TODO fetch config based on clientId
              robotsPromise = fetch("https://ndvivense.glov.ai/treatments.json");
              robotWeightsPromise = fetch("https://ndvivense.glov.ai/weights.json");
              eligibilityRulesPromise = fetch("https://ndvivense.glov.ai/weights.json");
              _context.next = 9;
              return Promise.all([robotsPromise, robotWeightsPromise, eligibilityRulesPromise]);
            case 9:
              _yield$Promise$all = _context.sent;
              _yield$Promise$all2 = _slicedToArray__default["default"](_yield$Promise$all, 3);
              robots = _yield$Promise$all2[0];
              robotWeights = _yield$Promise$all2[1];
              eligibilityRules = _yield$Promise$all2[2];
              _context.next = 16;
              return Promise.all([robots.json(), robotWeights.json(), eligibilityRules.json()]);
            case 16:
              _yield$Promise$all3 = _context.sent;
              _yield$Promise$all4 = _slicedToArray__default["default"](_yield$Promise$all3, 3);
              robotsJson = _yield$Promise$all4[0];
              robotWeightsJson = _yield$Promise$all4[1];
              eligibilityRulesJson = _yield$Promise$all4[2];
              robotsObj = {
                timestamp: Date.now(),
                robotsJson: robotsJson
              };
              window.localStorage.setItem("Glov_Robots", robotsObj);
              window.localStorage.setItem("Glov_Weights", robotWeightsJson);
              window.localStorage.setItem("Glov_Eligibility", eligibilityRulesJson);
            case 25:
              setTimeout(function () {
                return fetchConfig;
              }, 3600000);
            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function fetchConfig(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var eligibilityCheck = function eligibilityCheck() {
    var eligibilityRules = window.localStorage.getItem("Glov_Eligibility");
    var ruleEngine = new RuleEngine(eligibilityRules);
    ruleEngine.checkEligibilityRules();
  };

  var GlovContext = /*#__PURE__*/React__default["default"].createContext({
    eRule: {},
    context: [],
    productInfo: {}
  });
  var Glov = function Glov(clientId) {
    init(clientId);
    return GlovContext;
  };
  var GlovProvider = function GlovProvider(_ref) {
    var children = _ref.children,
      glov = _ref.glov;
    return /*#__PURE__*/React__default["default"].createElement(GlovContext.Provider, {
      value: {
        glov: glov
      }
    }, children);
  };
  function useRobot(id) {
    var _React$useContext = React__default["default"].useContext(GlovContext),
      glov = _React$useContext.glov;
    return glov.test || id;
    // return robot(id, glov);
  }
  function init(_x) {
    return _init.apply(this, arguments);
  }
  function _init() {
    _init = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(clientId) {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              glovInfoLayerInit();
              _context.next = 3;
              return fetchConfig(clientId);
            case 3:
              eligibilityCheck();
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _init.apply(this, arguments);
  }

  exports.Glov = Glov;
  exports.GlovProvider = GlovProvider;
  exports.useRobot = useRobot;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
