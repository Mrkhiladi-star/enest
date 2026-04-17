import mongoose from "mongoose";

const ActionItemSchema = new mongoose.Schema(
  {
    meetingId: String,

    task: String,

    owner: {
      type: String,
      default: "Unassigned",
    },

    deadline: {
      type: String,
      default: "No deadline",
    },

    priority: {
      type: String,
      default: "medium",
    },

    status: {
      type: String,
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ActionItem ||
  mongoose.model("ActionItem", ActionItemSchema);