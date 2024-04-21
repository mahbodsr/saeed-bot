import { Bot } from "grammy";
import { createServer } from "http";
import "./job.js";

process.env.TZ = "Asia/Tehran";

const bot = new Bot("6666871515:AAHkpjn_aSj08IItJzELf4xr-7qarSMcnw0"); // <-- Enter Bot Token Here

bot.hears("ثانیه", (ctx) => {
  if (!ctx.message?.reply_to_message) return;
  const msg = ctx.message.reply_to_message;
  const fullName = [msg.from?.first_name, msg.from?.last_name].join(" ");
  const date = new Date(ctx.message.reply_to_message.date * 1000);
  const t = date.toLocaleTimeString("fa-IR-u-nu-latn", {
    hour12: false,
  });
  const d = date.toLocaleDateString("fa-IR-u-nu-latn");
  ctx.reply(
    `┎ <a href="tg://user?id=${msg.from.id}">${fullName}</a>\n┣ ${d}\n┖ ${t}`,
    {
      reply_parameters: { message_id: ctx.message.reply_to_message.message_id },
      parse_mode: "HTML",
    }
  );
});

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.end();
});

server.listen(10000, () => {
  console.log("HTTP server is running");
});

bot.start({ onStart: () => console.log("Bot Started Successfuly") });
