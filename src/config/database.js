import { DatabaseSync } from "node:sqlite";

class DB {
  constructor() {
    this.database = new DatabaseSync(":memory:");
  }

  start() {
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) UNIQUE NOT NULL,
        username VARCHAR(55) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) UNIQUE NOT NULL,
        createdAt DATETIME,
        updatedAt DATETIME
      );

      CREATE TABLE IF NOT EXISTS annotation (
        id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
        publicId INTEGER,
        authorId VARCHAR(36) UNIQUE NOT NULL,
        title TEXT,
        content TEXT,
        createdAt DATETIME,
        updatedAt DATETIME,
        FOREING KEY authorId REFERENCES users(id)
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

  insertNewUser(user) {
    const { userId, username, hashedPassword, createdAt, updatedAt } = user;

    const existingUser = this.database
      .prepare(
        `
      SELECT * FROM users WHERE username = ?
      `,
      )
      .get(username);

    if (existingUser) return { error: "username already exists" };

    const inserterdUser = this.database
      .prepare(
        `
      INSERT INTO users (id, username, passwordHash, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)
    `,
      )
      .run(userId, username, hashedPassword, createdAt, updatedAt);

    return inserterdUser;
  }
}

export default new DB();
