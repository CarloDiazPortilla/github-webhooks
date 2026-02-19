import { Router } from "express";
import { GithubRouter } from "./github/routes.js";

export class ServerRouter {
  static get routes() {
    const router = Router();

    router.use("/api/github", GithubRouter.routes);

    return router;
  }
}