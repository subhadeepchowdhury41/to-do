import { useField } from "formik";
import { TextField, Box, TextFieldProps } from "@mui/material";

const AppTextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props.name || "");
  return (
    <Box marginBottom={2}>
      <TextField
        {...field}
        {...props}
        label={label}
        fullWidth
        error={Boolean(meta.touched && meta.error)}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    </Box>
  );
};

export default AppTextField;
