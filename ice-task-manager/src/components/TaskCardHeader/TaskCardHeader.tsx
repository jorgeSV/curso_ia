import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { TaskStatus } from "../../types/task";

type Props = {
  name: string;
  status: TaskStatus;
  iceScore?: number;
};

const statusLabel: Record<TaskStatus, string> = {
  idle: "Pendiente",
  loading: "Calculando",
  ready: "Por revisar",
  done: "Priorizada",
  error: "Error",
};

const statusColor: Record<
  TaskStatus,
  "default" | "primary" | "success" | "warning" | "error"
> = {
  idle: "default",
  loading: "warning",
  ready: "success",
  done: "primary",
  error: "error",
};

export default function TaskCardHeader({ name, status, iceScore }: Props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" component="h3">
        {name}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
        {typeof iceScore === "number" ? (
          <Chip color="primary" label={`ICE ${iceScore}`} size="small" />
        ) : null}

        <Chip
          color={statusColor[status]}
          label={statusLabel[status]}
          size="small"
        />
      </Stack>
    </Stack>
  );
}
