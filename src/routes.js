import { Router } from "express";

import AnnotationController from "./controllers/annotation.controller.js";

const routes = Router();

routes.get("/", (req, res) => {
  return res.send("receba");
});

routes.post("/annotation", (req, res) => {
  const { title, content } = req.body;

  const annotation = AnnotationController.insert({ title, content });

  return res.json(annotation).status(200);
});

export default routes;
