import { Scenes } from "telegraf";
import { applyingToken, isTokenValid } from "./processToken.js";

const create = new Scenes.WizardScene(
  "create-wizard",
  async (ctx) => {
    await ctx.reply("Store your token:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    const token = ctx.wizard.ctx.message.text;
    if (!isTokenValid(token)) {
      await ctx.reply("token invalid!!");
      return await ctx.scene.leave();
    }

    await applyingToken(token, ctx.message.from);

    await ctx.reply("authenticated");
    return await ctx.scene.leave();
  }
);

export default create;
