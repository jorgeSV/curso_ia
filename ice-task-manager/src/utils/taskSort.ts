import type { Task } from '../types/task';

const hasConfirmedScore = (task: Task): boolean => typeof task.iceScore === 'number';

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    const aHasScore = hasConfirmedScore(a);
    const bHasScore = hasConfirmedScore(b);

    if (aHasScore && !bHasScore) {
      return -1;
    }

    if (!aHasScore && bHasScore) {
      return 1;
    }

    if (aHasScore && bHasScore && a.iceScore !== b.iceScore) {
      return (b.iceScore ?? 0) - (a.iceScore ?? 0);
    }

    return a.createdAt - b.createdAt;
  });
};
