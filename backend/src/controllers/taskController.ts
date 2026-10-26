import type { RequestHandler } from "express";
import {
  validateCreateTask,
  validateUpdateTask,
} from "../utils/schemas/tasks.js";
import Task from "../models/taskModel.js";
import AppError from "../utils/appError.js";

export const createTask: RequestHandler = async function (req, res) {
  // 1) Extract data and validate it by zod
  const data = validateCreateTask(req.body);

  if (!req.user) throw new AppError("Session expired", 401);

  // 2) Create new task
  const { description, dueDate, ...taskData } = data;
  const createdTask = await Task.create({
    ...taskData,
    ...(description !== undefined ? { description } : {}),
    ...(dueDate !== undefined ? { dueDate } : {}),
    userId: req.user.id,
  });

  // 3) Send response
  res.status(201).json({
    status: "success",
    data: { task: createdTask },
  });
};

export const getAllTasks: RequestHandler = async function (req, res) {
  // 1) Get Task from db by id & and check if found
  if (!req.user) throw new AppError("User unauthorized", 401);

  // 2) Get all tasks from DB
  const tasks = await Task.find({ userId: req.user?.id });

  res.status(200).json({
    status: "success",
    data: { tasks },
  });
};

export const getTask: RequestHandler = async function (req, res) {
  // 1) Extrat task id from req.params and check if valid
  const taskId = req.params.id;
  if (!taskId || typeof taskId !== "string")
    throw new AppError("Task is not found", 404);

  // 2) Get Task from db by id & and check if found
  if (!req.user) throw new AppError("User unauthorized", 401);

  const task = await Task.findOne({ _id: taskId, userId: req.user?.id });
  if (!task) throw new AppError("Task is not found", 404);

  // 3) Send it to client
  res.status(200).json({
    status: "success",
    data: { task },
  });
};

export const updateTask: RequestHandler = async function (req, res) {
  // 1) Extrat task id from req.params and check if valid
  const taskId = req.params.id;
  if (!taskId || typeof taskId !== "string")
    throw new AppError("Task is not found", 404);

  // 2) Validate data by zod
  const data = validateUpdateTask(req.body);

  // 3) Update task
  if (!req.user) throw new AppError("Session expired", 401);
  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: taskId,
      userId: req.user.id,
    },
    data,
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedTask) throw new AppError("Task is not found", 404);

  // 4) Send response
  res.status(200).json({
    status: "success",
    data: { task: updatedTask },
  });
};

export const deleteTask: RequestHandler = async function (req, res) {
  // 1) Extract task id and validate it
  const taskId = req.params.id;
  if (!taskId) throw new AppError("There is no task found", 404);

  // 2) Get User id from req and validate it
  const userId = req.user?.id;
  if (!userId) throw new AppError("There is no user belong to this task", 401);

  // 3) Delete task from DB
  const result = await Task.deleteOne({ _id: taskId, userId });

  if (result.deletedCount === 0)
    throw new AppError("There is no task found", 404);

  res.status(204).send();
};
