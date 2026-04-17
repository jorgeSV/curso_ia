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
      updateTaskState(currentTasks, taskId, (task) => {
        const normalizedValues = normalizeIceValues(values);
        const impact = normalizedValues.impact ?? task.impact;
        const confidence = normalizedValues.confidence ?? task.confidence;
        const ease = normalizedValues.ease ?? task.ease;

        return {
          ...task,
          impact,
          confidence,
          ease,
          iceScore: calculateIceScore(impact, confidence, ease),
          status: "ready",
          errorMessage: undefined,
        };
      }),
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
    openPriorityModal,
    closePriorityModal,
  };
};
