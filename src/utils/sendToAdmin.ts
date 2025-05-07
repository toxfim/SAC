import bot from "../bot";

function sendToAdmin(message: Error) {
  const messageText = JSON.stringify(message);
  try {
    bot.sendMessage(process.env.ADMIN_TELEGRAM_CHAT_ID as string, messageText, {
      parse_mode: "MarkdownV2",
    });
  } catch (error) {
    console.error("Error sending message to admin:", error);
  }
}

export default sendToAdmin;
