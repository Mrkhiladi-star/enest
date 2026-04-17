import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "General Meeting",
    },

    rawNotes: String,

    summary: {
      type: [String],
      default: [],
    },

    tag: {
      type: String,
      default: "general",
    },

    decisions: {
      type: [String],
      default: [],
    },

    questions: {
      type: [String],
      default: [],
    },

    followups: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Meeting ||
  mongoose.model("Meeting", MeetingSchema);