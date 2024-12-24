/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface AppDatePickerProps
  extends Omit<DatePickerProps<any>, "onChange" | "value"> {
  name: string;
}

const AppDatePicker = ({ label, ...props }: AppDatePickerProps) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <DatePicker
      {...props}
      label={label}
      value={dayjs(field.value)}
      onChange={(value) => helpers.setValue(value)}
      slotProps={{
        textField: {
          fullWidth: true,
          error: Boolean(meta.touched && meta.error),
          helperText: meta.touched && meta.error ? meta.error : "",
        },
      }}
    />
  );
};

export default AppDatePicker;
