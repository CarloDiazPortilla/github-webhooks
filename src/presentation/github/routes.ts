import { Router } from "express";
import { GithubController } from "./controller.js";
import { GithubService } from "../services/github-service.js";

export class GithubRouter {
  static get routes() {
    const router = Router();
    const githubService = new GithubService();
    const controller = new GithubController(githubService);

    router.post("/", controller.webhookHandler);

    return router;
  }
}