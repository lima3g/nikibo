import { Router } from "express";

import AnnotationController from "./controllers/annotation.controller.js";

const routes = Router();

routes.get("/", (req, res) => {
  return res.send("receba");
});

routes.get("/annotation/:_id", AnnotationController.index);

routes.post("/annotation", AnnotationController.store);

export default routes;
