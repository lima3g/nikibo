import { nanoid } from "nanoid";

import DB from "../config/database.js";

class AnnotationController {
  index(req, res) {
    const publicId = req.params._id;

    if (!publicId) {
      return res.json("ID cannot be null").status(400);
    }

    const uniqueAnnotation = DB.getUniqueAnnotation(publicId);

    if (!uniqueAnnotation) {
      return res
        .json({ error: `Annotation not found: id=${publicId}` })
        .status(400);
    }

    return res.json(uniqueAnnotation).status(200);
  }

  store(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.json("title or content cannot be null!");
    }

    try {
      const insertedAnnotation = DB.insertNewAnnotation({
        publicId: nanoid(10),
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return res.json(insertedAnnotation).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }
}

export default new AnnotationController();
