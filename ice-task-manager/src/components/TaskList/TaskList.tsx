import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";

type Props = {
  tasks: Task[];
  selectedTaskId?: string;
  onSelectTask: (taskId: string) => void;
  onCalculateTaskIce: (taskId: string) => void;
};

export default function TaskList({
  tasks,
  selectedTaskId,
  onSelectTask,
  onCalculateTaskIce,
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
        >
          <Stack spacing={1.5}>
            <Button
              variant="contained"
              disabled={task.status === "loading"}
              onClick={(event) => {
                event.stopPropagation();
                onCalculateTaskIce(task.id);
              }}
              startIcon={
                task.status === "loading" ? (
                  <CircularProgress color="inherit" size={16} />
                ) : undefined
              }
              sx={{ alignSelf: "flex-start" }}
            >
              {task.status === "loading" ? "Calculando ICE" : "Calcular ICE"}
            </Button>

            {task.status === "error" && task.errorMessage ? (
              <Alert severity="error">{task.errorMessage}</Alert>
            ) : null}

            {task.status === "ready" && task.suggestion ? (
              <Alert severity="success">
                {`Sugerencia recibida: I ${task.suggestion.impact}, C ${task.suggestion.confidence}, E ${task.suggestion.ease}. ${task.suggestion.reason}`}
              </Alert>
            ) : null}
          </Stack>
        </TaskCard>
      ))}
    </Stack>
  );
}
