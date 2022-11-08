import {conditionChecker} from "../utils";
import {getFromBeagleInfoLayer} from "../BeagleInfoLayer";
import Logger from "../logger";
const logger = new Logger("BeagleInfoLayerChecker");

export const checkDataLayerRule = async (rule) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {operator, condition, value} = rule;
  const runtimeValue = await dataLayerFinder(operator);
  return conditionChecker(runtimeValue, condition, value);
};

export const dataLayerFinder = async (key) => {
  logger.log("Searching beagleInfoLayer for key ", key);
  const res = await getFromBeagleInfoLayer(key, true, 25, 500);
  if (res !== null && res !== undefined) {
    logger.success(`Found key ${key} with value ${res}`);
    return res;
  }
  logger.failed(`Key ${key} not found in beagleInfoLayer`);
  return null;
};
