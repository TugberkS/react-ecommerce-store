import RuleEngine from "./GlovRuleEngine/index";

export const fetchConfig = async (clientId) => {
    let robotsObj, robotsTimestamp, fetchAll = false;
    try {
      robotsObj = JSON.parse(window.localStorage.getItem("Glov_Robots"));
      robotsTimestamp = robotsObj.timestamp;
    } catch (err) {
      robotsObj = null;
      robotsTimestamp = null;
      fetchAll = true;
    }
    if (robotsObj && robotsTimestamp) {
      const elapsedHours = Math.floor(((Date.now() - robotsTimestamp) / (1000 * 60 * 60)) % 24);
      if (elapsedHours > 1) fetchAll = true;
    } else fetchAll = true;

    if (fetchAll) {
      // TODO fetch config based on clientId
      const robotsPromise = fetch("https://ndvivense.glov.ai/treatments.json");
      const robotWeightsPromise = fetch("https://ndvivense.glov.ai/weights.json");
      const eligibilityRulesPromise = fetch("https://ndvivense.glov.ai/weights.json");
  
      const [robots, robotWeights, eligibilityRules] = await Promise.all([robotsPromise, robotWeightsPromise, eligibilityRulesPromise]);
      const [robotsJson, robotWeightsJson, eligibilityRulesJson] = await Promise.all([robots.json(), robotWeights.json(), eligibilityRules.json()])
      robotsObj = {
        timestamp: Date.now(),
        robotsJson,
      };
  
      window.localStorage.setItem("Glov_Robots", robotsObj);
      window.localStorage.setItem("Glov_Weights", robotWeightsJson);
      window.localStorage.setItem("Glov_Eligibility", eligibilityRulesJson);
    }
    setTimeout(() => fetchConfig, 3600000);
}

export const eligibilityCheck = () => {
    const eligibilityRules = window.localStorage.getItem("Glov_Eligibility")
    const ruleEngine = new RuleEngine(eligibilityRules);
    ruleEngine.checkEligibilityRules();
}

export const injectHTML = (value) => {
    const template = window.top.document.createElement("template");
    template.innerHTML = value.trim();
    window.top.document.body.appendChild(template.content.firstChild);
}

export const logging = () => {
    // TODO implement logging
}