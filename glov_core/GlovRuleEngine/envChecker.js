import {conditionChecker} from "../utils";
import {MOBILE_MEDIA_QUERY} from "../constants";
import Logger from "../logger";
const logger = new Logger("BeagleEnvChecker");

export const checkEnvRule = (rule) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {operator, condition, value} = rule;

  switch (operator) {
    case "device_type": {
      const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches ? "mobile" : "desktop";
      return conditionChecker(isMobile, condition, value);
    }
    case "PLACEHOLDER": {
      return null;
    }
    default:
      return null;
  }
};
