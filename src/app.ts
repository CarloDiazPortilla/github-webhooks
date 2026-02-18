import express from "express"
import { EnvironmentAdapter } from "./config/EnvironmentAdapter.js";
import type { Request, Response } from "express";

(() => {
  main();
})();

function main() {
  const app = express();

  app.post("/api/github", (req: Request, res: Response) => {
    res.json("Github endpoint");
  })

  app.listen(EnvironmentAdapter.envs.PORT, () => {
    console.log(`App running on port ${EnvironmentAdapter.envs.PORT}`);
  })
}