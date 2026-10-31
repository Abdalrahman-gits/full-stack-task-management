import z from "zod";
import { TASK_STATUSES, type ITask } from "../../models/taskModel.js";

const taskSchema = z.object({
  tag: z.string(),
  title: z.string(),
  status: z.enum(TASK_STATUSES).default("todo"),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

export function validateCreateTask(task: Omit<ITask, "userId">) {
  const validated = taskSchema.safeParse(task);
  if (!validated.success) {
    throw validated.error;
  }

  return validated.data;
}

// For updating tasks
const updateTaskSchema = taskSchema
  .omit({ status: true })
  .extend({
    status: z.enum(TASK_STATUSES),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

export function validateUpdateTask(task: unknown) {
  const validated = updateTaskSchema.safeParse(task);

  if (!validated.success) {
    throw validated.error;
  }

  return validated.data;
}
