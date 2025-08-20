import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

import DB from "../config/database.js";

class UserController {
  store(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "error at creating user" }).status(400);
    }

    bcrypt.hash(password, 10).then((hashedPassword) => {
      const user = {
        userId: randomUUID(),
        username,
        hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const insertedUser = DB.insertNewUser(user);

      return res.json(insertedUser).status(200);
    });
  }
  index(req, res) {}
  show(req, res) {}
  update(req, res) {}
  destroy(req, res) {}
}

export default new UserController();
