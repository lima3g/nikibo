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

  getUniqueAnotation(annotationData) {
    const { publicId } = annotationData;

    const requestedAnnotation = this.database
      .prepare("SELECT annotation WHERE id = (publicID) VALUES (?)")
      .run(publicId);

    return requestedAnnotation;
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
}

export default new DB();
