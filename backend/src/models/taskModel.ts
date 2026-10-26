import mongoose from "mongoose";

export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;

// (typeof TASK_STATUSES) === readonly [val1,val2,etc..] "readonly is bec, of (as const)"
// [number] === val1 | val2 | ...
type taskStatus = (typeof TASK_STATUSES)[number];

export interface ITask {
  userId: string;
  tag: string;
  title: string;
  status: taskStatus;
  description?: string;
  dueDate?: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
      ref: "User",
      select: false,
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title length must be more than 2 chars"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: TASK_STATUSES,
      default: "todo",
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
  },
  // {
  //   toJSON: {
  //     virtuals: true,
  //     transform(doc, ret) {
  //       ret.id = ret._id.toString();
  //       delete ret._id;
  //       delete ret.__v;
  //       return ret;
  //     },
  //   },
  // },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
