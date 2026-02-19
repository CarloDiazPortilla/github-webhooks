import type { GithubIssuePayload } from "../../interfaces/github-issue.interface.js";
import type { GithubStarPayload } from "../../interfaces/github-star.interface.js";

export class GithubService {
  constructor() { }

  async onStar(payload: GithubStarPayload): Promise<string> {
    const { action, repository, sender } = payload;

    return `User ${sender.login} ${action} star on ${repository.full_name}`
  }

  async onIssue(payload: GithubIssuePayload): Promise<string> {
    const { action, issue, repository, sender } = payload;

    if (action === "opened") {
      return `Issue was opened with name ${issue.title} by ${sender.login} in ${repository.full_name} repository`;
    }

    if (action === "closed") {
      return `An issue with name ${issue.title} was closed by ${issue.user.login} in ${repository.full_name} repository`;
    }

    if (action === "reopened") {
      return `An issue with name ${issue.title} was reopened by ${issue.user.login} in ${repository.full_name} repository`;
    }

    return `Unhandled issue action (${action}) was performed by ${sender.login} in ${repository.full_name} repository`
  }
}