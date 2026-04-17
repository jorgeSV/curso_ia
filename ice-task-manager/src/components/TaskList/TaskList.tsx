import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";

type Props = {
  tasks: Task[];
  selectedTaskId?: string;
  onSelectTask: (taskId: string) => void;
};

export default function TaskList({
  tasks,
  selectedTaskId,
  onSelectTask,
}: Props) {
  if (tasks.length === 0) {
    return (
      <Typography className="empty-state">
        Aún no hay tareas creadas. Añade la primera usando el formulario.
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isSelected={selectedTaskId === task.id}
          onSelect={onSelectTask}
        />
      ))}
    </Stack>
  );
}
