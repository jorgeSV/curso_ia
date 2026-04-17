import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Task } from "../../types/task";
import { calculateIceScore } from "../../utils/ice";

type Props = {
  open: boolean;
  task: Task | undefined;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function PriorityModal({
  open,
  task,
  onConfirm,
  onCancel,
}: Props) {
  const suggestion = task?.suggestion;
  const iceScore =
    suggestion !== undefined
      ? calculateIceScore(
          suggestion.impact,
          suggestion.confidence,
          suggestion.ease,
        )
      : undefined;

  return (
    <Dialog
      open={open && Boolean(suggestion)}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Sugerencia de prioridad ICE</DialogTitle>

      {suggestion !== undefined ? (
        <>
          <DialogContent>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                <Chip label={`Impacto: ${suggestion.impact}`} color="primary" />
                <Chip
                  label={`Confianza: ${suggestion.confidence}`}
                  color="primary"
                />
                <Chip
                  label={`Facilidad: ${suggestion.ease}`}
                  color="primary"
                />
              </Stack>

              {iceScore !== undefined ? (
                <Typography variant="h6">ICE Score: {iceScore}</Typography>
              ) : null}

              <Divider />

              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Justificación
                </Typography>
                <Typography variant="body2">{suggestion.reason}</Typography>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button variant="contained" onClick={onConfirm}>
              Confirmar sugerencia
            </Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
}
