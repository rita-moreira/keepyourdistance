import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    completedBy: {
      type: ObjectId,
      ref: "User",
    },
    // date: {
    //   type: String,
    //   required: true,
    // },
    comment: {
      type: String,
      required: true,
    },
    share: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdminTask", adminSchema);
