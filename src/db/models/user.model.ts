import { Schema, model, Document } from "mongoose";

export interface IChatHistory {
  role: "user" | "assistant";
  content: string;
  timeStamp?: Date;
}

interface IUser extends Document {
  name: string;
  chatID: number;
  chat_history: IChatHistory[];
}
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  chatID: {
    type: Number,
    required: true,
    unique: true,
  },
  chat_history: {
    type: [
      {
        role: { type: String, enum: ["user", "assistant"] },
        content: { type: String, required: true },
        timeStamp: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

const User = model<IUser>("User", UserSchema);
export default User;
