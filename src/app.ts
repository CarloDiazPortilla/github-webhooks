import express from "express"
import { EnvironmentAdapter } from "./config/EnvironmentAdapter.js";
import { ServerRouter } from "./presentation/routes.js";

(() => {
  main();
})();

function main() {
  const app = express();

  app.use(express.json());

  app.use(ServerRouter.routes)

  app.listen(EnvironmentAdapter.envs.PORT, () => {
    console.log(`App running on port ${EnvironmentAdapter.envs.PORT}`);
  })
}