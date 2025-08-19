import { DatabaseSync } from "node:sqlite";

class DB {
  constructor() {
    this.database = new DatabaseSync("./database.db");
  }

  start() {
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS annotation (
        id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
        publicId INTEGER,
        title TEXT,
        content TEXT,
        createdAt DATETIME,
        updatedAt DATETIME
      )
  `);
  }

  getUniqueAnnotation(publicId) {
    const row = this.database
      .prepare(
        `
      SELECT title, content FROM annotation WHERE publicId = ?
      `,
      )
      .get(publicId);

    if (!row) return null;

    return row;
  }

  insertNewAnnotation(annotationData) {
    const { publicId, title, content, createdAt, updatedAt } = annotationData;

    this.database
      .prepare(
        "INSERT INTO annotation (publicId, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
      )
      .run(publicId, title, content, createdAt, updatedAt);

    return annotationData;
  }

  getAllAnnotations() {
    const annotations = this.database
      .prepare("SELECT * FROM annotation ORDER BY createdAt DESC")
      .all();

    if (!annotations) return null;

    return annotations;
  }

  deleteAnnotation(publicId) {
    const annotation = this.database.prepare(
      `DELETE FROM annotation WHERE publicId = ?`,
    );

    const info = annotation.run(publicId);

    if (!info) return null;

    return info.changes > 0;
  }
}

export default new DB();
