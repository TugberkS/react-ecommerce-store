import {checkDataLayerRule} from "./dataLayerChecker";
import {checkElementRule} from "./elementChecker";
import {checkFunctionRule} from "./functionChecker";
import {checkSessionRule} from "./sessionChecker";
import {checkUrlRule} from "./urlChecker";
import {checkEnvRule} from "./envChecker";
import {checkProductInfoRule} from "./productInfoChecker";
import Logger from "../logger";
import { pushToGlovInfoLayer } from "../GlovInfoLayer";
const logger = new Logger("GlovRuleEngine");

export default class RuleEngine {
  constructor(body) {
    const {eligibilityRules, baseRuleSet, bindings} = body;
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
    const {chain, chain_condition, type} = rule;
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
          ruleSatisfied = ruleSatisfied && await this.checkRule(chain);
          break;
        case "or":
          ruleSatisfied = ruleSatisfied || await this.checkRule(chain);
          break;
        case "xor":
          ruleSatisfied = ruleSatisfied !== await this.checkRule(chain);
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
      pushToGlovInfoLayer(`eRules.${key}`, satisfiedRuleIds)
    }
  }
}
