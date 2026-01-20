import mongoose from "mongoose";

const MailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    scheduledAt: {
      type: Date
    },
    status: {
      type: String,
      enum: ["SCHEDULED", "SENT", "FAILED", "CANCELLED"],
      default: "SCHEDULED",
    },
    sentAt: {
      type: Date,
    },
    failureReason: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mail", MailSchema);
