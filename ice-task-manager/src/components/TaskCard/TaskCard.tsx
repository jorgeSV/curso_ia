import type { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Task } from "../../types/task";
import TaskCardHeader from "../TaskCardHeader/TaskCardHeader";

type Props = {
  task: Task;
  isSelected: boolean;
  onSelect: (taskId: string) => void;
  children?: ReactNode;
};

export default function TaskCard({
  task,
  isSelected,
  onSelect,
  children,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: isSelected ? "primary.main" : "divider",
        boxShadow: isSelected ? "0 0 0 1px rgba(25, 118, 210, 0.18)" : "none",
      }}
    >
      <CardActionArea onClick={() => onSelect(task.id)}>
        <CardContent>
          <Stack spacing={2}>
            <TaskCardHeader name={task.name} status={task.status} />

            <Typography variant="body1" color="text.secondary">
              {task.description}
            </Typography>

            {children ? (
              <>
                <Divider />
                <div>{children}</div>
              </>
            ) : null}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
