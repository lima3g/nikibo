import { Router } from "express";

import AnnotationController from "./controllers/annotation.controller.js";
import UserController from "./controllers/user.controller.js";

const routes = Router();

routes.get("/annotation/:_id", AnnotationController.show);
routes.post("/annotation", AnnotationController.store);
routes.get("/annotation", AnnotationController.index);
routes.delete("/annotation/:_id", AnnotationController.destroy);

routes.get("/users", (req, res) => res.send("receba"));
routes.post("/users", UserController.store);

export default routes;
