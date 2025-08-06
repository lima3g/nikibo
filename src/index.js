import app from "./app.js";
import DB from "./config/database.js";

const port = 3001 || Number(process.env.PORT);

DB.start();

app.listen(port, async () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
