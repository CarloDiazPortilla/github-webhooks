import type { Request, Response } from "express";
import type { GithubService } from "../services/github-service.js";
import type { DiscordService } from "../services/discord-service.js";

export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly discordService: DiscordService
  ) { }

  webhookHandler = async (req: Request, res: Response) => {
    const event = req.header("X-GitHub-Event") ?? "unknown";
    const payload = req.body;

    try {
      let message: string | null = null;

      switch (event) {
        case "star":
          message = await this.githubService.onStar(payload);
          break;

        case "issues":
          message = await this.githubService.onIssue(payload);
          break;

        default:
          console.log(`Unknown event ${event}`);
          return res.status(204).json(`Unknown event ${event}`);
      }

      await this.discordService.notify(message);

      return res.status(202).json({ status: "Accepted" });

    } catch (error) {
      console.error("Webhook error:", error);
      return res.status(500).json({
        error: "Internal webhook error"
      });
    }
  };
}