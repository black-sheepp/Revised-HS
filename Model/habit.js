const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
     {
          user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
          },
          content: {
               type: String,
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
