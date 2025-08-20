import database from "./database.js";

database.database.exec(`DROP TABLE IF EXISTS annotation`);
database.database.exec(`DROP TABLE IF EXISTS users`);
