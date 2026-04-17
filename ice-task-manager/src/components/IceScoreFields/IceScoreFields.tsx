import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import type { IceValues } from "../../types/task";
import { MAX_ICE_VALUE, MIN_ICE_VALUE, isValidIceValue } from "../../utils/ice";

type IceFieldKey = keyof IceValues;

type Props = IceValues & {
  onChange: (field: IceFieldKey, value: number) => void;
};

const fieldConfig: Array<{ key: IceFieldKey; label: string }> = [
  { key: "impact", label: "Impact" },
  { key: "confidence", label: "Confidence" },
  { key: "ease", label: "Ease" },
];

export default function IceScoreFields({
  impact,
  confidence,
  ease,
  onChange,
}: Props) {
  const values: IceValues = {
    impact,
    confidence,
    ease,
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
      {fieldConfig.map((field) => (
        <TextField
          key={field.key}
          label={field.label}
          type="number"
          size="small"
          value={values[field.key]}
          onChange={(event) => {
            if (event.target.value === "") {
              return;
            }

            const nextValue = Number(event.target.value);

            if (!isValidIceValue(nextValue)) {
              return;
            }

            onChange(field.key, nextValue);
          }}
          helperText="1-10"
          slotProps={{
            htmlInput: {
              min: MIN_ICE_VALUE,
              max: MAX_ICE_VALUE,
              step: 1,
              inputMode: "numeric",
            },
          }}
        />
      ))}
    </Stack>
  );
}
