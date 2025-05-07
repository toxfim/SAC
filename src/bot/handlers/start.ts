import bot from "..";

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `Ushbu bot SAC group inc ga tegishli`;
    bot.sendMessage(chatId, welcomeMessage);
});