import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { IceValues, Task } from "../../types/task";
import IceScoreFields from "../IceScoreFields/IceScoreFields";
import TaskCard from "../TaskCard/TaskCard";

type Props = {
  tasks: Task[];
  selectedTaskId?: string;
  onSelectTask: (taskId: string) => void;
  onCalculateTaskIce: (taskId: string) => void;
  onUpdateTaskIceValues: (taskId: string, values: Partial<IceValues>) => void;
};

export default function TaskList({
  tasks,
  selectedTaskId,
  onSelectTask,
  onCalculateTaskIce,
  onUpdateTaskIceValues,
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

            {task.impact !== undefined &&
            task.confidence !== undefined &&
            task.ease !== undefined ? (
              <IceScoreFields
                impact={task.impact}
                confidence={task.confidence}
                ease={task.ease}
                iceScore={task.iceScore}
                onChange={(values) => onUpdateTaskIceValues(task.id, values)}
              />
            ) : null}
          </Stack>
        </TaskCard>
      ))}
    </Stack>
  );
}
