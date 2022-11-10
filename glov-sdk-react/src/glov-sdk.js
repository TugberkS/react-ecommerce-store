import React from "react";
import { eligibilityCheck, fetchConfig } from "../../glov_core/index"
import { glovInfoLayerInit } from "../../glov_core/GlovInfoLayer/index";
  
const GlovContext = React.createContext({eRule:{}, context:[], robot:{"game_title": "Best Game Ever"}});
  
export const Glov = (clientId) => {
    init(clientId);
    return GlovContext;
}

export const GlovProvider = ({children, glov}) => {
    return (
        <GlovContext.Provider value={{glov}}>
            {children} 
        </GlovContext.Provider>
    )
}

function robot(id, glovContext) {
    return glovContext?.robot?.[id] || null;
  }

export function useRobot(id){
    console.log("oi!");
    const { glovContext } = React.useContext(GlovContext);
    console.log(glovContext);
  return robot(id, glovContext);
  }

async function init(clientId) {
    glovInfoLayerInit()
    await fetchConfig(clientId);
    eligibilityCheck();
}
