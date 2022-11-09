/* eslint-disable max-len */
import {
  LOCAL_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
  STYLESHEET_LOCATION,
  TREATMENT_WEIGHTS_LOCATION,
  TREATMENTS_LOCATION,
} from "./constants";
import { pushToGlovInfoLayer } from "./GlovInfoLayer";
import Logger from "./logger";

const logger = new Logger("BeagleUtils");
const months = {
  "ocak": 0,
  "şubat": 1,
  "mart": 2,
  "nisan": 3,
  "mayıs": 4,
  "haziran": 5,
  "temmuz": 6,
  "ağustos": 7,
  "eylül": 8,
  "ekim": 9,
  "kasım": 10,
  "aralık": 11,
};

export const removeDocumentHide = () => {
  window.top.document.documentElement.classList.remove("nextDay-hide");
};

export const fetchTreatments = async () => {
  logger.log("Fetching treatments");
  const treatments = await fetch(TREATMENTS_LOCATION);
  const jsonTreatment = await treatments.json();
  return jsonTreatment;
};

export const fetchTreatmentWeights = async () => {
  logger.log("Fetching treatment weights");
  const treatmentWeights = await fetch(TREATMENT_WEIGHTS_LOCATION);
  const jsonTreatmentWeights = await treatmentWeights.json();
  return jsonTreatmentWeights;
};

export const extractCookieIdentifier = (cookieString, cookieName) => {
  if (!cookieString) {
    return null;
  }

  const parsed = cookieString
      .split(";")
      .map((v) => v.split("="))
      .reduce((acc, v) => {
        if (v[0] && v[1]) {
          acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        }
        return acc;
      }, {});

  let identifier = parsed[cookieName];
  if (!identifier) {
    return null;
  }
  if (cookieName === "_ga") {
    // extract unique identifier from GA cookie
    const identifierIndex = 2;
    identifier = identifier.split(".")[identifierIndex];
  }
  return identifier;
};

export const determinePct = async (identifier) => {
  try {
    if (!identifier) {
      return null;
    }
    const hash = getUnsecureHash(identifier);
    if (hash === null) {
      return null;
    }
    const pct = hash % 100;
    if (pct >= 0 && pct < 100) {
      return pct;
    }
    return null;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

export const exitScrollListener = (callBack) => {
  const loop = () => {
    const scrollTop = window.top.document.documentElement.scrollTop;
    if (lastScrollTop - 400 > scrollTop) {
      clearInterval(exitScrollInterval);
      callBack();
    } else {
      lastScrollTop = scrollTop;
    }
  };

  let lastScrollTop = window.top.document.documentElement.scrollTop;
  const exitScrollInterval = setInterval(loop, 500);
};

/**
 * @description This function is used to apply treatments to the page on specific media type.
 * @param {MediaQueryList} mediaQueryCondition window.matchMedia("(max-width: 500px)")
 * @param {DOMNodeList } elements document.querySelectorAll("div.product_info")
 * @param {Object} styleChangesMap { "margin-top" : "10rem"}
 * @returns
 */

export const styleApplicator = (elements, styleChangesMap) => {
  logger.log("Applying style changes", styleChangesMap, "to elements", elements);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    for (const [key, value] of Object.entries(styleChangesMap)) {
      element.style[key] = value;
    }
  }
};

export const injectStyleSheet = async () => {
  const styleSheet = window.top.document.createElement("link");
  styleSheet.rel = "stylesheet";
  styleSheet.type = "text/css";
  styleSheet.href = STYLESHEET_LOCATION;
  window.top.document.head.appendChild(styleSheet);
};

export const prepareActions = async (identifier, actionsToPrepare, businessRuleId) => {
  const actions = JSON.parse(JSON.stringify(actionsToPrepare));
  let variant = null;
  for (const action of actions) {
    const {businessRuleTransformations, variants} = action;
    if (!businessRuleTransformations && !variants) continue;
    if (businessRuleId && businessRuleTransformations) {
      for (const businessTransformation of businessRuleTransformations) {
        if (businessTransformation.id === businessRuleId) {
          for (const key in businessTransformation) {
            if (key !== "id") {
              action[key] = businessTransformation[key];
            }
          }
        }
      }
    }
    if (variants) {
      for (const variantKey of Object.keys(variants)) {
        const randomPct = await determinePct(identifier + variantKey);
        if (randomPct < action.variants[variantKey].weight) {
          variant = variantKey;
          if (businessRuleId && variants[variantKey].businessRuleTransformations) {
            for (const businessTransformation of variants[variantKey].businessRuleTransformations) {
              if (businessTransformation.id === businessRuleId) {
                for (const key of Object.keys(businessTransformation)) {
                  if (key === "id") continue;
                  action[key] = businessTransformation[key];
                }
              }
            }
          } else {
            for (const key in variants[variantKey]) {
              if (key !== "weight" && key !== "businessRuleTransformations") {
                action[key] = variants[variantKey][key];
              }
            }
          }
          break;
        }
      }
    }
  }
  return [actions, variant];
};

export const initiateSessionStorages = () => {
  const {POPUP_DISPLAY_FLAG, SESSION_TIMESTAMP, SESSION_HISTORY} = SESSION_STORAGE_KEYS;

  const popupDisplayFlag = sessionStorage.getItem(POPUP_DISPLAY_FLAG);
  const sessionTimestamp = sessionStorage.getItem(SESSION_TIMESTAMP);
  const sessionHistory = sessionStorage.getItem(SESSION_HISTORY);

  if (popupDisplayFlag === null) {
    sessionStorage.setItem(POPUP_DISPLAY_FLAG, 0);
  }
  if (!sessionTimestamp) {
    sessionStorage.setItem(SESSION_TIMESTAMP, Date.now());
  }
  if (!sessionHistory) {
    sessionStorage.setItem(SESSION_HISTORY, [window.location.pathname]);
  } else {
    sessionStorage.setItem(SESSION_HISTORY, [window.location.pathname, sessionHistory]);
  }
};

export const conditionChecker = (runTimeValue, condition, value) => {
  if (condition === "notExist") {
    if (!runTimeValue) {
      logger.success("conditionChecker: -satisfied- target does not exist");
      return true;
    }
    logger.failed("conditionChecker: -not satisfied- target does exist");
    return false;
  }
  if (runTimeValue === null ||
    runTimeValue === undefined ||
    condition === null ||
    condition === undefined) {
    logger.failed("conditionChecker: runTimeValue or condition is not defined");
    return false;
  }
  switch (condition) {
    case "exist":
      if (runTimeValue) {
        logger.success("conditionChecker: -satisfied- target does exist");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target does not exist");
      return false;
    case "includes":
    case "contains":
      if (runTimeValue.includes(value)) {
        logger.success("conditionChecker: -satisfied- target contains value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target does not contain value");
      return false;
    case "notIncludes":
    case "notContains":
      if (!runTimeValue.includes(value)) {
        logger.success("conditionChecker: -satisfied- target does not contain value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target contains value");
      return false;
    case "equal":
      if (runTimeValue === value) {
        logger.success("conditionChecker: -satisfied- target equals value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target does not equal value");
      return false;
    case "notEqual":
      if (runTimeValue !== value) {
        logger.success("conditionChecker: -satisfied- target does not equal value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target equals value");
      return false;
    case "greaterThan":
      if (runTimeValue > value) {
        logger.success("conditionChecker: -satisfied- target is greater than value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target is not greater than value");
      return false;
    case "lessThan":
      if (runTimeValue < value) {
        logger.success("conditionChecker: -satisfied- target is less than value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target is not less than value");
      return false;
    case "greaterEquals":
      if (runTimeValue >= value) {
        logger.success("conditionChecker: -satisfied- target is greater or equal than value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target is not greater or equal than value");
      return false;
    case "lessEquals":
      if (runTimeValue <= value) {
        logger.success("conditionChecker: -satisfied- target is less or equal than value");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target is not less or equal than value");
      return false;
    case "between": {
      let [min, max] = value.split(",");
      min = parseInt(min);
      max = parseInt(max);
      if (runTimeValue >= min && runTimeValue <= max) {
        logger.success("conditionChecker: -satisfied- target is between min and max");
        return true;
      }
      logger.failed("conditionChecker: -not satisfied- target is not between min and max");
      return false;
    }
    case "regex": {
      const regex = new RegExp(value, "i");
      return regex.test(runTimeValue);
    }
    default:
      logger.failed("conditionChecker: condition is not defined ", condition);
      return false;
  }
};

export const getDebugMode = (oosReason) => {
  const {DEBUG_MODE, OUT_OF_SCOPE} = LOCAL_STORAGE_KEYS;
  const queryString = window.location.search;
  if (queryString.includes("nd_debug=")) {
    window.localStorage.setItem(OUT_OF_SCOPE, oosReason);
  }

  if (queryString.includes("nd_debug=1")) {
    window.localStorage.setItem(DEBUG_MODE, 1);
    pushToGlovInfoLayer("context.dbm", "on");
    return 1;
  }
  if (queryString.includes("nd_debug=2")) {
    window.localStorage.setItem(DEBUG_MODE, 2);
    pushToGlovInfoLayer("context.dbm", "on");
    return 2;
  }
  if (queryString.includes("nd_debug=0")) {
    window.localStorage.removeItem(DEBUG_MODE);
    pushToGlovInfoLayer("context.dbm", "off");
    return 0;
  }
  const current = parseInt(window.localStorage.getItem(DEBUG_MODE));
  pushToGlovInfoLayer("context.dbm", (current ? "on" : "off"));
  return (current || 0);
};

// get GA client id using ga.getAll()
export const getGaClientId = () => {
  const ga = window.ga;
  // if ga and ga.getAll() is not defined, return null
  if (ga && ga.getAll) {
    const trackers = ga.getAll();
    if (trackers && trackers.length) {
      return trackers[0].get("clientId");
    }
  }
  return null;
};

// get deterministic numeric hash from string that conatins only numbers
export const getUnsecureHash = (str) => {
  let hash = 0;
  if (str.length === 0) {
    return null;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  // return absolute value
  return Math.abs(hash);
};

// generate a 32-bit random integer
export const getRandomInt = () => {
  return Math.floor(Math.random() * 0x100000000);
};

// get current unix epoch time in seconds
export const getUnixTime = () => {
  return Math.floor(Date.now() / 1000);
};


export const getIdentifier = () => {
  return new Promise((resolve) => {
    try {
      let id = window.localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
      if (id !== null && id !== undefined) {
        logger.log("getIdentifier: got identifier from local storage", id);
        resolve(id);
        return;
      }
      id = getGaClientId();
      if (id !== null && id !== undefined) {
        logger.log("getIdentifier: got identifier from ga in first attempt", id);
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, id);
        resolve(id);
        return;
      } else {
        const extractIdentifierInterval = setInterval(() => {
          id = getGaClientId();
          if (id !== null && id !== undefined) {
            logger.log("getIdentifier: got identifier from ga", id);
            clearInterval(extractIdentifierInterval);
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, id);
            resolve(id);
          }
        }, 25);
        setTimeout(() => {
          clearInterval(extractIdentifierInterval);
          if (id === null || id === undefined) {
            logger.failed("Could not read GA client id");
            resolve(null);
          }
        }, 5000);
      }
    } catch (e) {
      logger.failed("Error in getIdentifier", e);
      resolve(null);
    }
  });
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const formatDeliveryDate = (date) => {
  if (!date || typeof date !== "string") return date;

  const result = {
    startMonthIndex: undefined,
    endMonthIndex: undefined,
    startDay: undefined,
    endDay: undefined,
  };

  let match = date.match("([\\d]+)-([\\d]+)\\s?([\\wıüğşöçİÖÇĞÜŞ]+)");
  if (match && match.length === 4) {
    result.startDay = parseInt(match[1]);
    result.endDay = parseInt(match[2]);
    result.startMonthIndex = months[match[3].toLowerCase()];
    result.endMonthIndex = result.startMonthIndex;
  } else {
    match = date.match("([\\d]+)\\s+([\\wıüğşöçİÖÇĞÜŞ]+)-([\\d]+)\\s+([\\wıüğşöçİÖÇĞÜŞ]+)");
    if (!match || match.length !== 5) return date;

    result.startDay = parseInt(match[1]);
    result.startMonthIndex = months[match[2].toLowerCase()];
    result.endDay = parseInt(match[3]);
    result.endMonthIndex = months[match[4].toLowerCase()];
  }

  try {
    const today = new Date();

    if (!result.startMonthIndex || !result.endMonthIndex) return date;

    const startYear = result.startMonthIndex >= today.getMonth() ? today.getFullYear() : today.getFullYear() + 1;
    const endYear = result.endMonthIndex >= today.getMonth() ? today.getFullYear() : today.getFullYear() + 1;

    const estimatedStart = new Date(startYear, result.startMonthIndex, result.startDay);
    const estimatedEnd = new Date(endYear, result.endMonthIndex, result.endDay);


    const startDiffOverDays = Math.ceil(Math.abs(estimatedStart - today) / (1000 * 60 * 60 * 24));
    const endDiffOverDays = Math.ceil(Math.abs(estimatedEnd - today) / (1000 * 60 * 60 * 24));

    const startDiffOverWeeks = startDiffOverDays < 7 ? 0 : Math.ceil(startDiffOverDays / 7);
    const endDiffOverWeeks = endDiffOverDays < 7 ? 0 : Math.ceil(endDiffOverDays / 7);

    if (startDiffOverWeeks === 0 && endDiffOverWeeks === 0) {
      return `${startDiffOverDays} - ${endDiffOverDays} Gün`;
    }

    if (startDiffOverWeeks === 0 && endDiffOverWeeks >= 1) {
      return `${startDiffOverDays} Gün - ${endDiffOverWeeks} Hafta`;
    }

    if (startDiffOverWeeks === endDiffOverWeeks) {
      return `${startDiffOverWeeks} Hafta`;
    }

    return `${startDiffOverWeeks} - ${endDiffOverWeeks} Hafta`;
  } catch (err) {
    return date;
  }
};

export const idleTimer = async (timeOut, callBack) => {
  let idleTimeout = setTimeout(callBack, timeOut);

  window.top.document.ontouchstart = resetTimer;

  function resetTimer() {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(callBack, timeOut);
  }
};

export const getBrowserType = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    return "chrome";
  }

  if (userAgent.match(/firefox|fxios/i)) {
    return "firefox";
  }

  if (userAgent.match(/safari/i)) {
    return "safari";
  }

  if (userAgent.match(/opr\//i)) {
    return "opera";
  }

  if (userAgent.match(/edg/i)) {
    return "edge";
  }

  return null;
};
