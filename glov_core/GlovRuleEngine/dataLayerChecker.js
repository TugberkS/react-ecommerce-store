import {conditionChecker} from "../utils";
import Logger from "../logger";
import { getFromGlovInfoLayer } from "../GlovInfoLayer/index";
const logger = new Logger("BeagleInfoLayerChecker");

export const checkDataLayerRule = async (rule) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {operator, condition, value} = rule;
  const runtimeValue = await dataLayerFinder(operator);
  return conditionChecker(runtimeValue, condition, value);
};

export const dataLayerFinder = async (key) => {
  logger.log("Searching beagleInfoLayer for key ", key);
  const res = await getFromGlovInfoLayer(key);
  if (res !== null && res !== undefined) {
    logger.success(`Found key ${key} with value ${res}`);
    return res;
  }
  logger.failed(`Key ${key} not found in beagleInfoLayer`);
  return null;
};
