import { createNodeMiddleware, createProbot } from "probot";

import { robot as app } from "../../../src/bot.js"

const probot = createProbot();

export default createNodeMiddleware(app, { probot, webhooksPath: '/api/github/webhooks' });