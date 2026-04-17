import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Task } from "../../types/task";
import IceScoreFields from "../IceScoreFields/IceScoreFields";
import TaskCard from "../TaskCard/TaskCard";

type Props = {
  tasks: Task[];
  selectedTaskId?: string;
  onSelectTask: (taskId: string) => void;
  onCalculateTaskIce: (taskId: string) => void;
  onReviewTaskSuggestion: (taskId: string) => void;
  onUpdateTaskIceValues: (
    taskId: string,
    values: Partial<{ impact: number; confidence: number; ease: number }>,
  ) => void;
};

export default function TaskList({
  tasks,
  selectedTaskId,
  onSelectTask,
  onCalculateTaskIce,
  onReviewTaskSuggestion,
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
                if (task.status === "ready" && task.suggestion) {
                  onReviewTaskSuggestion(task.id);
                  return;
                }

                onCalculateTaskIce(task.id);
              }}
              startIcon={
                task.status === "loading" ? (
                  <CircularProgress color="inherit" size={16} />
                ) : undefined
              }
              sx={{ alignSelf: "flex-start" }}
            >
              {task.status === "loading"
                ? "Calculando ICE"
                : task.status === "ready" && task.suggestion
                  ? "Revisar sugerencia"
                  : task.iceScore !== undefined
                    ? "Recalcular ICE"
                    : "Calcular ICE"}
            </Button>

            {task.status === "error" && task.errorMessage ? (
              <Alert severity="error">{task.errorMessage}</Alert>
            ) : null}

            {task.status === "ready" && task.suggestion ? (
              <Alert severity="info">
                La sugerencia está lista para revisar.
              </Alert>
            ) : null}

            {task.impact !== undefined &&
            task.confidence !== undefined &&
            task.ease !== undefined ? (
              <Stack spacing={1.5}>
                <IceScoreFields
                  impact={task.impact}
                  confidence={task.confidence}
                  ease={task.ease}
                  onChange={(field, value) => {
                    onUpdateTaskIceValues(task.id, { [field]: value });
                  }}
                />

                <Typography variant="body2" color="text.secondary">
                  {`ICE actual: ${task.iceScore ?? "sin calcular"}`}
                </Typography>

                {task.reason ? (
                  <Typography variant="body2" color="text.secondary">
                    {task.reason}
                  </Typography>
                ) : null}
              </Stack>
            ) : null}
          </Stack>
        </TaskCard>
      ))}
    </Stack>
  );
}
