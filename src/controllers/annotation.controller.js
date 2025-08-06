import { nanoid } from "nanoid";

import DB from "../config/database.js";

class AnnotationController {
  insert(data) {
    const { title, content } = data;

    const insertedAnnotation = DB.insertNewAnnotation({
      publicId: nanoid(10),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return insertedAnnotation;
  }
}

export default new AnnotationController();
