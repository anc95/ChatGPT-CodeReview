import { createNodeMiddleware, createProbot } from "probot";

import { robot as app } from "../../../lib/bot.js"

const probot = createProbot();

export default createNodeMiddleware(app, { probot, webhooksPath: '/api/github/webhooks' });