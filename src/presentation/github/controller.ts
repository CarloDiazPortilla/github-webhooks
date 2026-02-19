import type { Request, Response } from "express";
import type { GithubService } from "../services/github-service.js";

export class GithubController {
  constructor(
    private readonly githubService: GithubService
  ) { }

  webhookHandler = (req: Request, res: Response) => {

    const event = req.header("X-GitHub-Event") ?? "unknown";
    const signature = req.header("X-Hub-Signature-256");
    const payload = req.body;

    switch (event) {
      case "star":
        this.githubService.onStar(payload)
          .then(message => console.log(message))
          .catch(error => console.log(error))
        break;
      case "issues":
        this.githubService.onIssue(payload)
          .then(message => console.log(message))
          .catch(error => console.log(error))
        break;
      default:
        console.log(`Unknown event ${event}`)
    }

    res.status(201).json("Accepted");
  }
}