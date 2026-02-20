import { Router } from "express";
import { GithubController } from "./controller.js";
import { GithubService } from "../services/github-service.js";
import { DiscordService } from "../services/discord-service.js";
import { EnvironmentAdapter } from "../../config/EnvironmentAdapter.js";

export class GithubRouter {
  static get routes() {
    const router = Router();

    const githubService = new GithubService();
    const discordService = new DiscordService(
      EnvironmentAdapter.envs.DISCORD_WEBHOOK_URL
    );
    const controller = new GithubController(githubService, discordService);

    router.post("/", controller.webhookHandler);

    return router;
  }
}