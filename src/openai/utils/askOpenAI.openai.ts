import dotenv from "dotenv";
import openai from "..";
import bot from "../../bot";
dotenv.config();

export default async function askOpenAI(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error asking OpenAI:", error);
    await bot.sendMessage(
      process.env.ADMIN_TELEGRAM_CHAT_ID as string,
      `Error asking OpenAI: ${error}`
    );
    throw error;
  }
}
