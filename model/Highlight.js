import { Schema, model, models } from "mongoose";

const highlightSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  highlightedText: {
    type: String,
    required: true,
  },

  verse_num: {
    type: String,
    required: true,
  },
  mistakes_map: {
    type: String,
  },
});

const Highlight = models.highlight || model("highlight", highlightSchema);

export default Highlight;
