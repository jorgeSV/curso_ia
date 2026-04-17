import { useState } from "react";

import {
  GeminiServiceError,
  getIceSuggestionFromGemini,
} from "../services/gemini";
import type { IceValues, Task } from "../types/task";
import { calculateIceScore, normalizeIceValues } from "../utils/ice";
import { sortTasksByPriority } from "../utils/taskSort";

type CreateTaskInput = {
  name: string;
  description: string;
};

type UpdateTaskIceValuesInput = {
  taskId: string;
  values: Partial<IceValues>;
};

const buildTask = ({ name, description }: CreateTaskInput): Task => ({
  id: crypto.randomUUID(),
  name: name.trim(),
  description: description.trim(),
  status: "idle",
  createdAt: Date.now(),
});

const updateTaskState = (
  tasks: Task[],
  taskId: string,
  nextTask: (task: Task) => Task,
): Task[] => {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return nextTask(task);
  });
};

const getSuggestionErrorMessage = (error: unknown): string => {
  if (error instanceof GeminiServiceError) {
    return error.message;
  }

  return "No se ha podido calcular la sugerencia ICE. Intentalo de nuevo.";
};

const applyIceValues = (
  task: Task,
  values: Partial<IceValues>,
  reason?: string,
): Task => {
  const normalizedValues = normalizeIceValues(values);
  const impact = normalizedValues.impact ?? task.impact;
  const confidence = normalizedValues.confidence ?? task.confidence;
  const ease = normalizedValues.ease ?? task.ease;

  return {
    ...task,
    impact,
    confidence,
    ease,
    reason: reason ?? task.reason,
    iceScore: calculateIceScore(impact, confidence, ease),
    status: "done",
    errorMessage: undefined,
  };
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(
    undefined,
  );
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);
  const sortedTasks = sortTasksByPriority(tasks);

  const createTask = ({
    name,
    description,
  }: CreateTaskInput): Task | undefined => {
    const normalizedName = name.trim();
    const normalizedDescription = description.trim();

    if (!normalizedName || !normalizedDescription) {
      return undefined;
    }

    const nextTask = buildTask({
      name: normalizedName,
      description: normalizedDescription,
    });

    setTasks((currentTasks) => [...currentTasks, nextTask]);
    setSelectedTaskId(nextTask.id);

    return nextTask;
  };

  const selectTask = (taskId: string | undefined) => {
    setSelectedTaskId(taskId);
  };

  const updateTaskIceValues = ({
    taskId,
    values,
  }: UpdateTaskIceValuesInput) => {
    setTasks((currentTasks) =>
      updateTaskState(currentTasks, taskId, (task) =>
        applyIceValues(task, values),
      ),
    );
  };

  const requestTaskIceSuggestion = async (taskId: string) => {
    const task = tasks.find((currentTask) => currentTask.id === taskId);

    if (!task) {
      return;
    }

    setSelectedTaskId(taskId);
    setTasks((currentTasks) =>
      updateTaskState(currentTasks, taskId, (currentTask) => ({
        ...currentTask,
        status: "loading",
        errorMessage: undefined,
      })),
    );

    try {
      const suggestion = await getIceSuggestionFromGemini(task.description);

      setTasks((currentTasks) =>
        updateTaskState(currentTasks, taskId, (currentTask) => ({
          ...currentTask,
          status: "ready",
          suggestion,
          errorMessage: undefined,
        })),
      );
      setIsPriorityModalOpen(true);
    } catch (error) {
      setTasks((currentTasks) =>
        updateTaskState(currentTasks, taskId, (currentTask) => ({
          ...currentTask,
          status: "error",
          suggestion: undefined,
          errorMessage: getSuggestionErrorMessage(error),
        })),
      );
    }
  };

  const confirmTaskSuggestion = (taskId: string) => {
    setTasks((currentTasks) =>
      updateTaskState(currentTasks, taskId, (task) => {
        if (!task.suggestion) {
          return task;
        }

        return applyIceValues(task, task.suggestion, task.suggestion.reason);
      }),
    );
    setIsPriorityModalOpen(false);
  };

  const openPriorityModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsPriorityModalOpen(true);
  };

  const closePriorityModal = () => {
    setIsPriorityModalOpen(false);
  };

  return {
    tasks,
    sortedTasks,
    selectedTask,
    selectedTaskId,
    isPriorityModalOpen,
    createTask,
    selectTask,
    updateTaskIceValues,
    requestTaskIceSuggestion,
    confirmTaskSuggestion,
    openPriorityModal,
    closePriorityModal,
  };
};
