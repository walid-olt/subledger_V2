import User from "../models/User.model.js";
import Subscription from "../models/Subscription.model.js";
import { connectDB } from "../config/db.js";

const clearDB = async () => {
  await connectDB();
  await User.deleteMany({});
  await Subscription.deleteMany({});
  console.log("Database cleared");
  process.exit(0);
};

await clearDB();

// npm command to run this script: npm run clear-db
