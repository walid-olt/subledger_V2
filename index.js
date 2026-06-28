import server from "./app.js";
import { connectDB } from "./config/db.js";
import env from "./config/env.js";
server.listen(env.PORT, async () => {
  await connectDB();
  console.log(`server is running on port ${process.env.PORT}`);
});
