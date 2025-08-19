import { Router } from "express";

import AnnotationController from "./controllers/annotation.controller.js";

const routes = Router();

routes.get("/annotation/:_id", AnnotationController.show);
routes.post("/annotation", AnnotationController.store);
routes.get("/annotation", AnnotationController.index);
routes.delete("/annotation/:_id", AnnotationController.destroy);

export default routes;
