import {conditionChecker} from "../utils";
import Logger from "../logger";
const logger = new Logger("BeagleFunctionChecker");

export const checkFunctionRule = (rule, opts) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {productInfo} = opts;
  const {operator, condition, value, bindings} = rule;
  if (!operator) {
    logger.failed("Rule function not defined");
    return false;
  }
  let context = {};
  if (bindings == "productInfo") {
    context = {
      productInfo,
    };
  }
  const ruleFunction = Function(operator).bind(context);
  const runtimeValue = ruleFunction();
  return conditionChecker(runtimeValue, condition, value);
};
