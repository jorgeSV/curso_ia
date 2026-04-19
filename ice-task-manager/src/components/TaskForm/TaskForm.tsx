import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

type TaskFormValues = {
  name: string;
  description: string;
};

type TaskFormErrors = {
  name?: string;
  description?: string;
};

type Props = {
  onSubmit: (values: TaskFormValues) => boolean;
};

const initialValues: TaskFormValues = {
  name: "",
  description: "",
};

const validateTaskForm = (values: TaskFormValues): TaskFormErrors => {
  const errors: TaskFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!values.description.trim()) {
    errors.description = "La descripción es obligatoria.";
  }

  return errors;
};

export default function TaskForm({ onSubmit }: Props) {
  const [values, setValues] = useState<TaskFormValues>(initialValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const handleChange =
    (field: keyof TaskFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      setValues((currentValues) => ({
        ...currentValues,
        [field]: nextValue,
      }));

      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));

      setSubmitError(undefined);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateTaskForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const wasCreated = onSubmit({
      name: values.name.trim(),
      description: values.description.trim(),
    });

    if (!wasCreated) {
      setSubmitError(
        "No se pudo crear la tarea. Revisa los campos e inténtalo de nuevo.",
      );
      return;
    }

    setValues(initialValues);
    setErrors({});
    setSubmitError(undefined);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          error={Boolean(errors.name)}
          helperText={
            errors.name ?? "Nombre corto y claro para identificar la tarea."
          }
        />

        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Descripción"
          name="description"
          value={values.description}
          onChange={handleChange("description")}
          error={Boolean(errors.description)}
          helperText={
            errors.description ??
            "Describe el problema o trabajo a priorizar con ICE."
          }
        />

        {submitError ? <Alert severity="error">{submitError}</Alert> : null}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" size="large">
            Crear tarea
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
