import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
