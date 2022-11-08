import {conditionChecker} from "../utils";
import Logger from "../logger";
const logger = new Logger("BeagleUrlChecker");

export const checkUrlRule = (rule) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {operator, condition, value} = rule;

  switch (operator) {
    case "path": {
      const requestURL= window.top.location.href;
      const path = new URL(requestURL).pathname;
      logger.log(`Checking path ${path} matches rule path ${value}`);
      return conditionChecker(path, condition, value);
    }
    case "PLACEHOLDER": {
      return null;
    }
    default:
      return null;
  }
};
