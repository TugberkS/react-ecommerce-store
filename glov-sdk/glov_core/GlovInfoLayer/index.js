export const glovInfoLayerInit = () => {
    window.glovInfoLayer = window.glovInfoLayer || {eRule:{}, context:[]};
}

export const pushToGlovInfoLayer = (key, value) => {
    let infoLayer = window.glovInfoLayer;
    if (key.startsWith("context")) infoLayer = infoLayer.context;
    if (key.startsWith("eRule")) infoLayer = infoLayer.eRule;
    if (Array.isArray(infoLayer)) {
        infoLayer.push({[key.split(".")[1]]: value});
        return;
    }
    infoLayer[key.split(".")[1]] = value;
    return;
}

export const getFromGlovInfoLayer = (key) => {
    let infoLayer = window.glovInfoLayer;
    if (key.startsWith("context")) infoLayer = infoLayer.context;
    if (key.startsWith("eRule")) infoLayer = infoLayer.eRule;
    if (Array.isArray(infoLayer)) {
        for (const entry of infoLayer) {
            if (Object.keys(entry).includes(key)) return entry[key];
        }
    }
    else {
        return infoLayer[key];
    }
    return null;
}