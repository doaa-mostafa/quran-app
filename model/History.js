import { Schema, model, models } from "mongoose";

const historySchema = new Schema({
  Surah_name: {
    type: String,
    required: true,
  },
});

const History = models.history || model("history", historySchema);

export default History;
