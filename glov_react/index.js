import React from "react";
import { eligibilityCheck, fetchConfig } from "../glov_core"
import { glovInfoLayerInit } from "../glov_core/GlovInfoLayer";
  
const GlovContext = React.createContext({eRule:{}, context:[], productInfo:{}});
  
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

function robot(id,glov) {
    if (!glov) {
      return {
        value: null,
        on: false,
        off: true,
        source: "unknownrobot",
        ruleId: "",
      };
    }
    return glov.robot(id);
  }

export function useRobot(id){
    return id;
    // const { glov } = React.useContext(GlovContext);
    // return robot(id, glov);
  }

async function init(clientId) {
    glovInfoLayerInit()
    await fetchConfig(clientId);
    eligibilityCheck();
}
