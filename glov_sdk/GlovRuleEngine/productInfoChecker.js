import {conditionChecker} from "../utils";
import Logger from "../logger";

const logger = new Logger("BeagleProductInfoChecker");

export const checkProductInfoRule = (rule, bindings) =>{
  logger.log("Checking rule", JSON.stringify(rule));
  const {operator, condition, value} = rule;
  const {productInfo} = bindings;
  if (!productInfo || (typeof productInfo === "object" && !Object.keys(productInfo).length)) return false;
  let runtimeValue = null;
  const sku = productInfo[Object.keys(productInfo)[0]]?.id;
  switch (operator) {
    case "transactionIn2Weeks": {
      logger.log("Getting TransactionCount for sku ", sku);
      runtimeValue = getTransactionCount(sku, productInfo);
      break;
    }
    case "addToCartIn2Weeks": {
      logger.log("Getting AddToCartCount for sku ", sku);
      runtimeValue = getAddToCartCount(sku, productInfo);
      break;
    }
    case "productViewCount": {
      logger.log("Getting productViewCount for sku ", sku);
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
