/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grow,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref
) {
  return <Grow ref={ref} {...props} />;
});

const AppPopUp = ({
  open,
  onClose,
  title,
  content,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  content: string | JSX.Element;
  actions?: JSX.Element;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="popup-title"
      aria-describedby="popup-content"
      TransitionComponent={Transition}
    >
      {title && <DialogTitle id="popup-title">{title}</DialogTitle>}
      <DialogContent>
        {typeof content === "string" ? (
          <Typography variant="body1">{content}</Typography>
        ) : (
          content
        )}
      </DialogContent>
      <DialogActions>
        {actions || (
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AppPopUp;
