const mongoose = require("mongoose");

const checklistSchema = mongoose.Schema({
  name: { type: String, require: true },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Checklist", checklistSchema);
