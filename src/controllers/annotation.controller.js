import { nanoid } from "nanoid";

import DB from "../config/database.js";

class AnnotationController {
  store(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.json("title or content cannot be null!");
    }

    const insertedAnnotation = DB.insertNewAnnotation({
      publicId: nanoid(10),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return res.json(insertedAnnotation).status(200);
  }

  index(req, res) {
    const annotations = DB.getAllAnnotations();

    if (!annotations) {
      return res.json("cannot find annotations in database").status(400);
    }

    return res.json(annotations).status(200);
  }

  show(req, res) {
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

  update(req, res) {}

  destroy(req, res) {
    const publicId = req.params._id;

    if (!publicId) {
      return res.json("ID cannot be null").status(400);
    }

    const deletedAnnotation = DB.deleteAnnotation(publicId);

    if (!deletedAnnotation) {
      return res
        .json({ error: `Annotation could not be deleted: id=${publicId}` })
        .status(400);
    }

    return res
      .json({
        message: `annotation with publicId = ${publicId} has been deleted`,
      })
      .status(200);
  }
}

export default new AnnotationController();
