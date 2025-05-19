import openai from "..";
import dotenv from "dotenv";
import addChatHistory from "../../db/functions/addChatHistory";
dotenv.config();
import { IChatHistory } from "../../db/models/user.model";
import bot from "../../bot";

export default async function talkToAI(
  chatID: number,
  content: string,
  name: string,
  callback: (err: Error | null | unknown, response: string | null) => void
) {
  try {
    // await addChatHistory(chatID, { role: "user", content }, name);

    // Add chat history and ensure user exists
    // Fetch the updated user to get chat history
    const user = await addChatHistory(chatID, { role: "user", content }, name);
    if (!user) {
      throw new Error("User not found after adding chat history");
    }

    // Map chat history
    const chatHistory: IChatHistory[] = user.chat_history.map((chat) => {
      return { role: chat.role, content: chat.content };
    });

    // Placeholder for OpenAI interaction (to be implemented)
    const response = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: `
              Sen Shtukaturka.uz firmasida ishlaydigan customer support specialist.
              Haqiqiy odam ka'bi javob yoz, qisqa va lo'nda.
              Mijozlar bilan hush muomala muloqotda bo'l.
              Kompaniya qurilish xizmatlarini taklif qiladi: uy-joy ta'miri, dizayn, santexnika, elektr ishlari va boshqalar.
              Javoblaring rasmiy, qisqa va tushunarli bo‘lishi kerak.
              Mijozlarga xizmatlar, narxlar va bog‘lanish usullari haqida izoh ber.
              faqatgina mijoz bilan kelishuv amalga oshsa yoki senda yo'q bo'lgan ma'lumotlardan so'rashsa bog'lanish uchun aloqa ma'lumotlarini yubor: {tel: "+998904706600" first_name: "Aktam", last_name: "Avg'anov"}
              Hech qachon taxmin qilma yoki yolg‘on ma'lumot yozma. 
              Mijoz qaysi tilda yozsa o'sha tilda javob ber.
              Agar mijoz rus tilida yozsa, rus tilida javob ber. Agar o'zbek tilida yozsa, o'zbek tilida javob ber. agar krillcha yozsa krillcha javob ber.
              Javob faqat quyidagi formatda bo‘lsin:
              - *Qalin matn* uchun bitta yulduzcha ishlat
              - _Italik_ uchun pastki chiziq ishlat
              - Havola: [matn](url)

              **ikkita yulduzcha** ishlatma. Agar ishlatsang, Telegramda noto‘g‘ri ko‘rinadi.

              Agar foydalanuvchi chalkash savol bersa, yordam berishga harakat qil.
                1. Cement:
                    - ASLAN Cement (30kg): 43,000 so'm
                    - KNAUF Beton-Kontakt (20kg): 750,000 so'm

                2. Materiallar:
                    - Sertifikatlangan Mayak (0.6mm): 2,500 so'm
                    - Perforatsiyalangan burchak (35x35): 24,000 so'm

                3. Xizmatlar:
                    - Mexanizatsiyalangan suvoq: 40,000 so'm/m² dan
                    - Qo‘lda suvoq qilish: 35,000 so'm/m² dan
                    - Polni quruq tortish: 30,000 so'm/m² dan
            `,
        },
        ...chatHistory,
      ],
    });

    // Invoke the callback with the response
    callback(null, response.choices[0].message.content);
  } catch (error) {
    console.error("Error in talkToAI:", error);
    bot.sendMessage(process.env.ADMIN_TELEGRAM_CHAT_ID as string, `Error in talkToAI: ${error}`);
    callback(error, null);
  }
}
