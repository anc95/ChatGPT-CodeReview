import log, { LogLevelNames } from "loglevel";

log.setLevel((process.env.LOG_LEVEL as LogLevelNames) || "info");

export default log;