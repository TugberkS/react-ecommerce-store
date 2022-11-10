import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import React from 'react';

const replaceAll = (str, find, replace = "") => {
  if (!str) return "";
  const index = str.indexOf(find);
  if (index < 0) return str;
  while (str.indexOf(find) >= 0) {
    const index = str.indexOf(find);
    str = (index > 0 ? str.substring(0, index) : "") + replace + str.substring(index + find.length);
  }
  return str;
};

/* eslint-disable max-len */
// TODO revert the following staging env check after moving to new branch structure
window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/nd-styles_staging.css" : `https://ndvivense.glov.ai/nd-styles.css?id=${replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", "")}`;
const MOBILE_MEDIA_QUERY = "(max-width: 440px)";
const SESSION_STORAGE_KEYS = {
  SESSION_TIMESTAMP: "BG_SessionTimestamp",
  SESSION_HISTORY: "BG_SessionHistory",
  TREATMENTS: "BG_Treatments",
  POPUP_DISPLAY_FLAG: "BG_PopupDisplayFlag",
  SKU_INFO_BASKET: "BG_ProductInfoBasket",
  TIMEOUT_COUNT: "BG_TimeoutCount",
  SESSION_REFERRER: "BG_SessionReferrer"
};
const LOCAL_STORAGE_KEYS = {
  DEBUG_MODE: "BG_Debug",
  OUT_OF_SCOPE: "BG_OutOfScope",
  IS_LABEL_SENT: "BG_LabelSent",
  USER_ID: "BG_UserId_00",
  DATA_COLLECTION_DATA_SIZE: "BG_CollectionDataSize"
};

const glovInfoLayerInit = () => {
  window.glovInfoLayer = window.glovInfoLayer || {
    eRule: {},
    context: []
  };
};
const pushToGlovInfoLayer = (key, value) => {
  let infoLayer = window.glovInfoLayer;
  if (key.startsWith("context")) infoLayer = infoLayer.context;
  if (key.startsWith("eRule")) infoLayer = infoLayer.eRule;
  if (Array.isArray(infoLayer)) {
    infoLayer.push({
      [key.split(".")[1]]: value
    });
    return;
  }
  infoLayer[key.split(".")[1]] = value;
  return;
};
const getFromGlovInfoLayer = key => {
  let infoLayer = window.glovInfoLayer;
  if (key.startsWith("context")) infoLayer = infoLayer.context;
  if (key.startsWith("eRule")) infoLayer = infoLayer.eRule;
  if (Array.isArray(infoLayer)) {
    for (const entry of infoLayer) {
      if (Object.keys(entry).includes(key)) return entry[key];
    }
  } else {
    return infoLayer[key];
  }
  return null;
};

class Logger {
  constructor(origin = "GlovClientSDK") {
    this.origin = origin;
    this.DEBUG = window.localStorage.getItem(LOCAL_STORAGE_KEYS.DEBUG_MODE);
  }
  info(...args) {
    const {
      origin
    } = this;
    console.info(`[${origin}]`, ...args);
  }
  log(...args) {
    const {
      DEBUG,
      origin
    } = this;
    if (DEBUG) {
      console.log(`[${origin}]`, ...args);
    }
  }
  failed(...args) {
    const {
      DEBUG,
      origin
    } = this;
    if (!DEBUG) return;
    let messageConfig = "%c%s   ";
    args.forEach(argument => {
      const type = typeof argument;
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
    console.log(messageConfig, "color: red", `[${origin}]`, ...args);
  }
  success(...args) {
    const {
      DEBUG,
      origin
    } = this;
    if (!DEBUG) return;
    let messageConfig = "%c%s   ";
    args.forEach(argument => {
      const type = typeof argument;
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
    console.log(messageConfig, "color: green", `[${origin}]`, ...args);
  }
  warn(...args) {
    const {
      origin
    } = this;
    console.warn(`[${origin}]`, ...args);
  }
  error(...args) {
    const {
      origin
    } = this;
    console.error(`[${origin}]`, ...args);
  }
}

/* eslint-disable max-len */
const logger$8 = new Logger("BeagleUtils");
const conditionChecker = (runTimeValue, condition, value) => {
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
        let [min, max] = value.split(",");
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
        const regex = new RegExp(value, "i");
        return regex.test(runTimeValue);
      }
    default:
      logger$8.failed("conditionChecker: condition is not defined ", condition);
      return false;
  }
};

const logger$7 = new Logger("BeagleInfoLayerChecker");
const checkDataLayerRule = async rule => {
  logger$7.log("Checking rule", JSON.stringify(rule));
  const {
    operator,
    condition,
    value
  } = rule;
  const runtimeValue = await dataLayerFinder(operator);
  return conditionChecker(runtimeValue, condition, value);
};
const dataLayerFinder = async key => {
  logger$7.log("Searching beagleInfoLayer for key ", key);
  const res = await getFromGlovInfoLayer(key);
  if (res !== null && res !== undefined) {
    logger$7.success(`Found key ${key} with value ${res}`);
    return res;
  }
  logger$7.failed(`Key ${key} not found in beagleInfoLayer`);
  return null;
};

const logger$6 = new Logger("BeagleElementChecker");
const checkElementRule = rule => {
  logger$6.log("Checking rule", JSON.stringify(rule));
  const {
    operator,
    condition,
    value,
    selector,
    selectorAll,
    selectorFallback = null
  } = rule;
  let mainSelector = selector;
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
  let element;
  if (mainSelector) element = window.top.document.querySelector(mainSelector);else if (selectorAll) element = Array.from(window.top.document.querySelectorAll(selectorAll));
  switch (operator) {
    case "text-number":
      {
        let tempVal;
        if (Array.isArray(element)) {
          tempVal = element.reduce((returnVal, elem) => {
            returnVal += parseInt(elem.textContent.replace("TL", "").replace(".", ""));
            return returnVal;
          }, 0);
        } else {
          tempVal = parseInt(window.top.document.querySelector(mainSelector).textContent.replace("TL", "").replace(".", ""));
        }
        const runTimeValue = parseInt(tempVal);
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
        const elementStyles = getComputedStyle(element);
        const styleKey = value.split(":")[0].trim();
        const styleValue = value.split(":")[1].trim();
        const runTimeValue = elementStyles[styleKey];
        return conditionChecker(runTimeValue, condition, styleValue);
      }
    default:
      logger$6.failed("Operator not defined");
      return false;
  }
};

const logger$5 = new Logger("BeagleFunctionChecker");
const checkFunctionRule = (rule, opts) => {
  logger$5.log("Checking rule", JSON.stringify(rule));
  const {
    productInfo
  } = opts;
  const {
    operator,
    condition,
    value,
    bindings
  } = rule;
  if (!operator) {
    logger$5.failed("Rule function not defined");
    return false;
  }
  let context = {};
  if (bindings == "productInfo") {
    context = {
      productInfo
    };
  }
  const ruleFunction = Function(operator).bind(context);
  const runtimeValue = ruleFunction();
  return conditionChecker(runtimeValue, condition, value);
};

const logger$4 = new Logger("BeagleSessionChecker");
const checkSessionRule = rule => {
  logger$4.log("Checking rule", JSON.stringify(rule));
  const {
    operator,
    condition,
    value
  } = rule;
  switch (operator) {
    case "duration":
      return durationHandler(condition, value);
    case "history":
      return historyHandler(condition, value);
    default:
      return null;
  }
};
const getSessionTimestamp = () => {
  try {
    return new Date(parseInt(window.sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_TIMESTAMP)));
  } catch (err) {
    logger$4.failed("Could not get session timestamp", err);
    return Date.now();
  }
};
const durationHandler = (condition, value) => {
  const duration = (Date.now() - getSessionTimestamp()) / 1000;
  return conditionChecker(duration, condition, parseInt(value));
};
const historyHandler = (condition, value) => {
  const currentHistory = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_HISTORY)?.split(",");
  return conditionChecker(currentHistory, condition, value);
};

const logger$3 = new Logger("BeagleUrlChecker");
const checkUrlRule = rule => {
  logger$3.log("Checking rule", JSON.stringify(rule));
  const {
    operator,
    condition,
    value
  } = rule;
  switch (operator) {
    case "path":
      {
        const requestURL = window.top.location.href;
        const path = new URL(requestURL).pathname;
        logger$3.log(`Checking path ${path} matches rule path ${value}`);
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

const logger$2 = new Logger("BeagleEnvChecker");
const checkEnvRule = rule => {
  logger$2.log("Checking rule", JSON.stringify(rule));
  const {
    operator,
    condition,
    value
  } = rule;
  switch (operator) {
    case "device_type":
      {
        const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches ? "mobile" : "desktop";
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

const logger$1 = new Logger("BeagleProductInfoChecker");
const checkProductInfoRule = (rule, bindings) => {
  logger$1.log("Checking rule", JSON.stringify(rule));
  const {
    operator,
    condition,
    value
  } = rule;
  const {
    productInfo
  } = bindings;
  if (!productInfo || typeof productInfo === "object" && !Object.keys(productInfo).length) return false;
  let runtimeValue = null;
  const sku = productInfo[Object.keys(productInfo)[0]]?.id;
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
const getTransactionCount = (sku, productInfo) => {
  if (sku && productInfo && productInfo[sku]) {
    return productInfo[sku]?.catalog?.transactionIn2Weeks;
  }
  return -1;
};
const getAddToCartCount = (sku, productInfo) => {
  if (sku && productInfo && productInfo[sku]) {
    return productInfo[sku]?.catalog?.addToCartIn2Weeks;
  }
  return -1;
};
const getPreviewCount = (sku, productInfo) => {
  if (sku && productInfo && productInfo[sku]) {
    return productInfo[sku]?.catalog?.productViewCount;
  }
  return -1;
};

const logger = new Logger("GlovRuleEngine");
class RuleEngine {
  constructor(body) {
    const {
      eligibilityRules,
      baseRuleSet,
      bindings
    } = body;
    this.baseRuleSet = baseRuleSet;
    this.eligibilityRules = eligibilityRules;
    this.bindings = bindings;
  }
  async checkRules() {
    for (const rule of this.baseRuleSet) {
      const ruleSatisfied = await this.checkRule(rule);
      if (!ruleSatisfied) {
        return false;
      }
    }
    return true;
  }
  async checkRule(rule) {
    const {
      chain,
      chain_condition,
      type
    } = rule;
    let ruleSatisfied = null;
    // check rule
    switch (type) {
      case "session":
        ruleSatisfied = checkSessionRule(rule);
        break;
      case "element":
        ruleSatisfied = checkElementRule(rule);
        break;
      case "dataLayer":
        ruleSatisfied = await checkDataLayerRule(rule);
        break;
      case "url":
        ruleSatisfied = checkUrlRule(rule);
        break;
      case "function":
        ruleSatisfied = checkFunctionRule(rule, this.bindings);
        break;
      case "environment":
        ruleSatisfied = checkEnvRule(rule);
        break;
      case "productInfoLookup":
        ruleSatisfied = checkProductInfoRule(rule, this.bindings);
        break;
      default:
        logger.failed(`No such rule type: ${type}`);
        return null;
    }
    if (chain) {
      switch (chain_condition) {
        case "and":
          ruleSatisfied = ruleSatisfied && (await this.checkRule(chain));
          break;
        case "or":
          ruleSatisfied = ruleSatisfied || (await this.checkRule(chain));
          break;
        case "xor":
          ruleSatisfied = ruleSatisfied !== (await this.checkRule(chain));
          break;
        default:
          logger.failed("No such chain condition");
          break;
      }
    }
    return ruleSatisfied;
  }
  async checkEligibilityRules() {
    if (!this.eligibilityRules) return;
    for (const [key, rules] of Object.entries(this.eligibilityRules)) {
      const satisfiedRuleIds = [];
      for (const rule of rules) {
        if (await this.checkRule(rule)) {
          satisfiedRuleIds.push(rule.name);
        }
      }
      pushToGlovInfoLayer(`eRules.${key}`, satisfiedRuleIds);
    }
  }
}

const fetchConfig = async clientId => {
  let robotsObj,
    robotsTimestamp,
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
    const elapsedHours = Math.floor((Date.now() - robotsTimestamp) / (1000 * 60 * 60) % 24);
    if (elapsedHours > 1) fetchAll = true;
  } else fetchAll = true;
  if (fetchAll) {
    // TODO fetch config based on clientId
    const robotsPromise = fetch("https://ndvivense.glov.ai/treatments.json");
    const robotWeightsPromise = fetch("https://ndvivense.glov.ai/weights.json");
    const eligibilityRulesPromise = fetch("https://ndvivense.glov.ai/weights.json");
    const [robots, robotWeights, eligibilityRules] = await Promise.all([robotsPromise, robotWeightsPromise, eligibilityRulesPromise]);
    const [robotsJson, robotWeightsJson, eligibilityRulesJson] = await Promise.all([robots.json(), robotWeights.json(), eligibilityRules.json()]);
    robotsObj = {
      timestamp: Date.now(),
      robotsJson
    };
    window.localStorage.setItem("Glov_Robots", robotsObj);
    window.localStorage.setItem("Glov_Weights", robotWeightsJson);
    window.localStorage.setItem("Glov_Eligibility", eligibilityRulesJson);
  }
  setTimeout(() => fetchConfig, 3600000);
};
const eligibilityCheck = () => {
  const eligibilityRules = window.localStorage.getItem("Glov_Eligibility");
  const ruleEngine = new RuleEngine(eligibilityRules);
  ruleEngine.checkEligibilityRules();
};

var GlovContext = /*#__PURE__*/React.createContext({
  eRule: {},
  context: [],
  robot: {
    "game_title": "Best Game Ever"
  }
});
var Glov = function Glov(clientId) {
  init(clientId);
  return {
    eRule: {},
    context: [],
    robot: {
      "game_title": "Best Game Ever"
    }
  };
};
var GlovProvider = function GlovProvider(_ref) {
  var children = _ref.children,
    glov = _ref.glov;
  return /*#__PURE__*/React.createElement(GlovContext.Provider, {
    value: {
      glov: glov
    }
  }, children);
};
function robot(id, glovContext) {
  var _glovContext$robot;
  return (glovContext === null || glovContext === void 0 ? void 0 : (_glovContext$robot = glovContext.robot) === null || _glovContext$robot === void 0 ? void 0 : _glovContext$robot[id]) || null;
}
function useRobot(id) {
  console.log("oi!");
  var _React$useContext = React.useContext(GlovContext),
    glovContext = _React$useContext.glovContext;
  console.log(glovContext);
  return robot(id, glovContext);
}
function init(_x) {
  return _init.apply(this, arguments);
}
function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(clientId) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            glovInfoLayerInit();
            _context.next = 3;
            return fetchConfig();
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

export { Glov, GlovProvider, useRobot };
