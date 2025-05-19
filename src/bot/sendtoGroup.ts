import bot from ".";
import dotenv from "dotenv";
dotenv.config();

export default async function sendToGroup(message: string) {
  const groupId = process.env.GROUP_ID as string;
  try {
    bot.sendMessage(groupId, message, {
      message_thread_id: 2,
    });
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    bot.sendMessage(
      process.env.ADMIN_ID as string,
      `Error sending message: ${error}`
    );
  }
}
