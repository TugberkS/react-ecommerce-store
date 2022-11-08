import { eligibilityCheck, fetchConfig } from "../glov_core"

export const init = async () => {
    await fetchConfig();
    await eligibilityCheck();
}