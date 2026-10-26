import mongoose from "mongoose";
import crypto from "crypto";

/**
 * Enables us to delete all session from different devices for a user
 * User after logout he can't reuse the same refresh token as it's been deleted from DB
 */

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
    refreshToken: {
      type: String,
      required: [true, "Refresh token is required"],
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

// expireAt :1 means index by expiresat ascending
// { expireAfterSeconds: 0 } works as ttl "time to live"
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

sessionSchema.pre("save", function () {
  if (!this.isModified("refreshToken")) return;

  this.refreshToken = crypto
    .createHash("sha256")
    .update(this.refreshToken)
    .digest("hex");
});

const Session = mongoose.model("session", sessionSchema);

export default Session;
