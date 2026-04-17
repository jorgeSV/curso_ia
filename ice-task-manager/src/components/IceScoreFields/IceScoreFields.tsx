import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type { IceValues } from "../../types/task";
import { MAX_ICE_VALUE, MIN_ICE_VALUE } from "../../utils/ice";

type Props = {
  impact: number;
  confidence: number;
  ease: number;
  iceScore?: number;
  onChange: (values: Partial<IceValues>) => void;
};

export default function IceScoreFields({
  impact,
  confidence,
  ease,
  iceScore,
  onChange,
}: Props) {
  const handleChange =
    (field: keyof IceValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(event.target.value, 10);
      if (
        !Number.isNaN(parsed) &&
        parsed >= MIN_ICE_VALUE &&
        parsed <= MAX_ICE_VALUE
      ) {
        onChange({ [field]: parsed });
      }
    };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
        <TextField
          label="Impacto"
          type="number"
          value={impact}
          onChange={handleChange("impact")}
          slotProps={{ htmlInput: { min: MIN_ICE_VALUE, max: MAX_ICE_VALUE } }}
          size="small"
          sx={{ width: 110 }}
        />
        <TextField
          label="Confianza"
          type="number"
          value={confidence}
          onChange={handleChange("confidence")}
          slotProps={{ htmlInput: { min: MIN_ICE_VALUE, max: MAX_ICE_VALUE } }}
          size="small"
          sx={{ width: 110 }}
        />
        <TextField
          label="Facilidad"
          type="number"
          value={ease}
          onChange={handleChange("ease")}
          slotProps={{ htmlInput: { min: MIN_ICE_VALUE, max: MAX_ICE_VALUE } }}
          size="small"
          sx={{ width: 110 }}
        />
      </Stack>

      {iceScore !== undefined ? (
        <Typography variant="body2">
          <strong>ICE Score: {iceScore}</strong>
        </Typography>
      ) : null}
    </Stack>
  );
}
