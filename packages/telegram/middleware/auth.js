import { lowDbInit } from "../lowdb.js";

async function checkingData(id) {
  const db = await lowDbInit();
  db.data ||= { users: [] };

  const { users } = db.data;

  return users.find((q) => q.telegramId == id);
}

export async function auth(ctx, next) {
  const userExists = await checkingData(ctx.message.from.id);
  if (!userExists) {
    return ctx.reply("sorry, you don't have access to this bot!");
  }
  return next();
}

export async function isReadyAccess(ctx, next) {
  const userExists = await checkingData(ctx.message.from.id);

  if (userExists) {
    return ctx.reply("you can already access this bot");
  }

  return next();
}
