import bot from "..";
import talkToAI from "../../openai/utils/talkToAI.openai";
import addChatHistory from "../../db/functions/addChatHistory";
import { IChatHistory } from "../../db/models/user.model";
// import sendToGroup from "../sendtoGroup";

bot.on("business_message", async (msg) => {
  const chatID = msg.chat.id;
  const content = msg.text;
  const name = msg.from.first_name || msg.from?.username;
  if (!content) {
    console.error("No content in the message:");
    bot.sendMessage(
      process.env.ADMIN_TELEGRAM_CHAT_ID as string,
      "No content in the message:"
    );
    console.log(msg);
    return;
  }
  console.log("Business message received:", msg);
  const businessConnectionId = msg.business_connection_id; // Assuming this is how you get the business connection ID
  talkToAI(chatID, content, name, async (err, response) => {
    if (err) {
      console.error("Error:", err);
      return bot.sendMessage(
        process.env.ADMIN_TELEGRAM_CHAT_ID as string,
        `Error: ${err}`
      );
    }
    console.log("Response:", response);
    // adding a chat_history
    const newChatHistory: IChatHistory = {
      role: "assistant",
      content: response as string,
    };
    //   sendToGroup(response as string)
    await addChatHistory(chatID, newChatHistory);
    bot.sendChatAction(chatID, "typing", {
      // @ts-ignore
      business_connection_id: businessConnectionId,
      
    });
    bot.sendMessage(chatID, response as string, {
      // @ts-ignore
      business_connection_id: businessConnectionId,
      parse_mode: "Markdown",
    });
  });
});
 