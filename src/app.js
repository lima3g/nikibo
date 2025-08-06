import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes.js";

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
