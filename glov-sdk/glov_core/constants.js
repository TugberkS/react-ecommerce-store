/* eslint-disable max-len */
import {replaceAll} from "./stringUtils";

export const COOKIE_NAME = "_ga";
// TODO revert the following staging env check after moving to new branch structure
export const TREATMENTS_LOCATION = window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
export const TREATMENT_WEIGHTS_LOCATION = window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
export const STYLESHEET_LOCATION = window.location.href.includes("staging.vivense") ? "https://ndvivense.glov.ai/nd-styles_staging.css" : `https://ndvivense.glov.ai/nd-styles.css?id=${replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", "")}`;
export const LOG_API_URL = "https://europe-west3-nextday-34eb3.cloudfunctions.net/api/log";
export const LOOKUP_API_URL = "https://catalog-api.adoraai.com";
export const MOBILE_MEDIA_QUERY = "(max-width: 440px)";
// Control group percentage
export const SPLIT_RATIO = 50;
// Skipped treatment percentage
export const TREATMENT_RATIO = 50;
export const TREATMENTS_DURATION = 1;
export const MAX_TIMEOUT_PER_SESSION = 1;
export const LIST_MODE_BEAGLE_KEYS = ["pagetype", "category", "alltimePLPCategoryMode", "sessionPLPCategoryMode",
  "alltimePDPCategoryMode", "sessionPDPCategoryMode", "alltimeCartCategoryMode", "sessionCartCategoryMode"];
  // TODO set to 120000(ms) before go live
export const IDLE_TIMEOUT = 15000;

export const SESSION_STORAGE_KEYS = {
  SESSION_TIMESTAMP: "BG_SessionTimestamp",
  SESSION_HISTORY: "BG_SessionHistory",
  TREATMENTS: "BG_Treatments",
  POPUP_DISPLAY_FLAG: "BG_PopupDisplayFlag",
  SKU_INFO_BASKET: "BG_ProductInfoBasket",
  TIMEOUT_COUNT: "BG_TimeoutCount",
  SESSION_REFERRER: "BG_SessionReferrer",
};
export const LOCAL_STORAGE_KEYS = {
  DEBUG_MODE: "BG_Debug",
  OUT_OF_SCOPE: "BG_OutOfScope",
  IS_LABEL_SENT: "BG_LabelSent",
  USER_ID: "BG_UserId_00",
  DATA_COLLECTION_DATA_SIZE: "BG_CollectionDataSize",
};

export const CUSTOM_STORAGE_PREFIX = "BG_Seg_";
