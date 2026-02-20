import "dotenv/config";
import env from "env-var";

export class EnvironmentAdapter {
  static readonly envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    DISCORD_WEBHOOK_URL: env.get("DISCORD_WEBHOOK_URL").required().asUrlString()
  }
}