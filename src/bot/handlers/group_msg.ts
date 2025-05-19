import bot from "..";

bot.on("message", async (msg) => {
  const chatid = msg.chat.id;
  console.log("Message received:", msg);
  bot.sendMessage(chatid, "Hello Guys", {
    message_thread_id: 2,
  });
});
