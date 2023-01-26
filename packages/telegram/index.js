import { Telegraf, Scenes, session } from "telegraf";
import create from "./createScene.js";
import { auth, isReadyAccess } from "./middleware/auth.js";

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([create]);

bot.use(session());
bot.use(stage.middleware());
// Register logger middleware
bot.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log("response time %sms", ms);
  });
});

// commands
bot.start((ctx) => ctx.reply("Watifier notification bot"));
bot.help((ctx) =>
  ctx.reply(
    "bot ini masih dalam pengembangan. untuk sementara waktu hanya bisa menerima notif jika device terputus"
  )
);

bot.command("create", isReadyAccess, (ctx) => {
  ctx.scene.enter("create-wizard");
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
