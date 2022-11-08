import {LOCAL_STORAGE_KEYS} from "./constants";
class Logger {
  constructor(origin = "GlovClientSDK") {
    this.origin = origin;
    this.DEBUG = window.localStorage.getItem(LOCAL_STORAGE_KEYS.DEBUG_MODE);
  }

  info(...args) {
    const {origin} = this;
    console.info(`[${origin}]`, ...args);
  }

  log(...args) {
    const {DEBUG, origin} = this;
    if (DEBUG) {
      console.log(`[${origin}]`, ...args);
    }
  }

  failed(...args) {
    const {DEBUG, origin} = this;
    if (!DEBUG) return;
    let messageConfig = "%c%s   ";

    args.forEach((argument) => {
      const type = typeof argument;
      switch (type) {
        case "bigint":
        case "number":
        case "boolean":
          messageConfig += "%d   ";
          break;

        case "string":
          messageConfig += "%s   ";
          break;

        case "object":
        case "undefined":
        default:
          messageConfig += "%o   ";
      }
    });
    console.log(messageConfig, "color: red", `[${origin}]`, ...args);
  }

  success(...args) {
    const {DEBUG, origin} = this;
    if (!DEBUG) return;
    let messageConfig = "%c%s   ";

    args.forEach((argument) => {
      const type = typeof argument;
      switch (type) {
        case "bigint":
        case "number":
        case "boolean":
          messageConfig += "%d   ";
          break;

        case "string":
          messageConfig += "%s   ";
          break;

        case "object":
        case "undefined":
        default:
          messageConfig += "%o   ";
      }
    });
    console.log(messageConfig, "color: green", `[${origin}]`, ...args);
  }

  warn(...args) {
    const {origin} = this;
    console.warn(`[${origin}]`, ...args);
  }

  error(...args) {
    const {origin} = this;
    console.error(`[${origin}]`, ...args);
  }
}

export default Logger;
