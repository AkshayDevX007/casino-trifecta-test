import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  } as const,
  { _id: false, timestamps: true }
);

SessionSchema.index({ user_id: 1 });
SessionSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
