import { run } from "probot";
import log from "./log.js";
import { robot } from "./bot.js";

log.info("Starting probot");

run(robot)