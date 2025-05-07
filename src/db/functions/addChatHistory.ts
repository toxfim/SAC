import User, { IChatHistory } from "../models/user.model";

export default async function addChatHistory(
  chatID: number,
  chatHistory: IChatHistory,
  name?: string
) {
  try {
    let user = await User.findOne({ chatID });
    if (!user) {
      user = new User({ chatID, name, chat_history: [chatHistory] });
      await user.save();
      return user;
    }
    user.chat_history.push(chatHistory);
    await user.save();
    return user;
  } catch (error) {
    console.error("Error adding chat history:", error);
    return null; // Explicitly return null in case of an error
  }
}
