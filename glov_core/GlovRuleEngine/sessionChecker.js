import {SESSION_STORAGE_KEYS} from "../constants";
import {conditionChecker} from "../utils";
import Logger from "../logger";
const logger = new Logger("BeagleSessionChecker");

export const checkSessionRule = (rule) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {operator, condition, value} = rule;
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
    logger.failed("Could not get session timestamp", err);
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
