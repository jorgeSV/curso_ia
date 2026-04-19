import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Task } from "../../types/task";
import { calculateIceScore } from "../../utils/ice";

type Props = {
  open: boolean;
  task?: Task;
  onClose: () => void;
  onConfirm: (taskId: string) => void;
};

export default function PriorityModal({
  open,
  task,
  onClose,
  onConfirm,
}: Props) {
  const suggestion = task?.suggestion;
  const suggestedScore = suggestion
    ? calculateIceScore(
        suggestion.impact,
        suggestion.confidence,
        suggestion.ease,
      )
    : undefined;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Revisar sugerencia ICE</DialogTitle>
      <DialogContent>
        {task && suggestion ? (
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {task.name}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Alert severity="info">{`Impact: ${suggestion.impact}`}</Alert>
              <Alert severity="info">{`Confidence: ${suggestion.confidence}`}</Alert>
              <Alert severity="info">{`Ease: ${suggestion.ease}`}</Alert>
            </Stack>

            <Alert severity="success">
              {`ICE sugerido: ${suggestedScore ?? "sin calcular"}`}
            </Alert>

            <Typography variant="body1">{suggestion.reason}</Typography>
            <Typography variant="body2" color="text.secondary">
              Confirma para aplicar estos valores y habilitar la edición manual.
            </Typography>
          </Stack>
        ) : (
          <Alert severity="warning" sx={{ mt: 1 }}>
            No hay una sugerencia pendiente para revisar.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (task) {
              onConfirm(task.id);
            }
          }}
          disabled={!task || !suggestion}
        >
          Confirmar sugerencia
        </Button>
      </DialogActions>
    </Dialog>
  );
}
