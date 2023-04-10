import mongoose from "mongoose";
import env from "./environment.js";

main().catch((err) => console.log("Error in connecting Database:\n", err));

async function main() {
  await mongoose.connect(env.db_url);
}

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to MongoDb ::", env.name);
});

export default db;
