// import { fileURLToPath } from "url";
// import { dirname } from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export async function lowDbInit() {
  const adapter = new JSONFile("./db/db_auth.json");
  const db = new Low(adapter);

  await db.read();
  //   db.data ||= { users: [] };

  return db;
}
