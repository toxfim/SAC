import bot from ".";

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `Ushbu bot SAC group inc ga tegishli`;
  await bot.sendMessage(chatId, welcomeMessage);
});
