 export const fetchConfig = async (clientId) => {
    // TODO check if config already exists, fetch only if no config or config is expired (more than 1 hour)
    // TODO fetch config based on clientId
    const robotsPromise = fetch("https://ndvivense.glov.ai/treatments.json");
    const robotWeightsPromise = fetch("https://ndvivense.glov.ai/weights.json");
    const eligibilityRulesPromise = fetch("https://ndvivense.glov.ai/weights.json");

    const [robots, robotWeights, eligibilityRules] = await Promise.all([robotsPromise, robotWeightsPromise, eligibilityRulesPromise]);
    const [robotsJson, robotWeightsJson, eligibilityRulesJson] = await Promise.all([robots.json(), robotWeights.json(), eligibilityRules.json()])

    window.localStorage.setItem("Glov_Robots", robotsJson);
    window.localStorage.setItem("Glov_Weights", robotWeightsJson);
    window.localStorage.setItem("Glov_Eligibility", eligibilityRulesJson);
    
    setTimeout(() => fetchConfig, 3600000);
}

export const eligibilityCheck = async () => {
    const eligibilityRules = window.localStorage.getItem("Glov_Eligibility")
    // TODO construct rule engine
    // const ruleEngine = new RuleEngine();
    for (const [key, rules] of Object.entries(eligibilityRules)) {
        const satisfiedRuleIds = [];
        for (const rule of rules) {
            //call ruleEngine.checkRule;
          if (await this.checkRule(rule)) {
            satisfiedRuleIds.push(rule.name);
          }
        }
        // Add to pool state/context api
        // addToBeagleInfoLayer(`eRules.${key}`, satisfiedRuleIds);
      }
}

export const injectHTML = (value) => {
    const template = window.top.document.createElement("template");
    template.innerHTML = value.trim();
    window.top.document.body.appendChild(template.content.firstChild);
}

export const logging = () => {
    // TODO implement logging
}