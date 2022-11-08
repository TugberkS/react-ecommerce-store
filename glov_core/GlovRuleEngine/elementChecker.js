import {conditionChecker} from "../utils";
import Logger from "../logger";
const logger = new Logger("BeagleElementChecker");

export const checkElementRule = (rule) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {operator, condition, value, selector, selectorAll, selectorFallback = null} = rule;
  let mainSelector = selector;
  if (mainSelector && !window.top.document.querySelector(mainSelector)) {
    mainSelector = selectorFallback ? selectorFallback : mainSelector;
  }

  if (operator === null) {
    return conditionChecker(window.top.document.querySelector(mainSelector), condition, value);
  }
  if (mainSelector && !window.top.document.querySelector(mainSelector)) {
    logger.failed("Selector not found on page");
    return false;
  }
  if (selectorAll && !window.top.document.querySelectorAll(selectorAll)) {
    logger.failed("Selector not found on page");
    return false;
  }

  let element;
  if (mainSelector) element = window.top.document.querySelector(mainSelector);
  else if (selectorAll) element = Array.from(window.top.document.querySelectorAll(selectorAll));

  switch (operator) {
    case "text-number": {
      let tempVal;
      if (Array.isArray(element)) {
        tempVal = element.reduce((returnVal, elem) => {
          returnVal += parseInt(elem.textContent.replace("TL", "").replace(".", ""));
          return returnVal;
        }, 0);
      } else {
        tempVal = parseInt(window.top.document.querySelector(mainSelector).textContent
            .replace("TL", "").replace(".", ""));
      }
      const runTimeValue = parseInt(tempVal);
      return conditionChecker(runTimeValue, condition, value);
    }
    case "classList":
      return conditionChecker(Array.from(element.classList), condition, value);
    case "count": {
      if (Array.isArray(element) && element.length > 0) {
        return conditionChecker(element.length, condition, value);
      } else if (element) {
        return conditionChecker(1, condition, value);
      } else {
        return conditionChecker(0, condition, value);
      }
    }
    case "style": {
      const elementStyles = getComputedStyle(element);
      const styleKey = value.split(":")[0].trim();
      const styleValue = value.split(":")[1].trim();
      const runTimeValue = elementStyles[styleKey];
      return conditionChecker(runTimeValue, condition, styleValue);
    }
    default:
      logger.failed("Operator not defined");
      return false;
  }
};
