import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const userTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
      min: 3,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      min: 20,
      max: 10000,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    acceptedBy: {
      type: ObjectId,
      ref: "User",
    },
    completed: {
      type: Boolean,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserTask", userTaskSchema);
