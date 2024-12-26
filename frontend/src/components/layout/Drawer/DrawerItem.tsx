import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const DrawerItem = ({
  icon,
  highlightedIcon,
  highlighted,
  title,
  path,
}: {
  icon: React.ReactNode;
  highlightedIcon: React.ReactNode;
  title: string;
  path: string;
  highlighted?: boolean;
}) => {
  return (
    <ListItem component={Link} to={path} disablePadding sx={{ mt: 1 }}>
      <ListItemButton
        dense
        sx={{
          borderRadius: "4px",
          backgroundColor: highlighted ? "action.hover" : "transparent",
        }}
      >
        <ListItemIcon
          sx={{
            color: highlighted ? "primary.main" : "secondary.contrastText",
            minWidth: "15%",
          }}
        >
          {highlighted ? highlightedIcon : icon}
        </ListItemIcon>
        <ListItemText
          sx={{
            "& .MuiListItemText-primary": {
              color: highlighted ? "primary.main" : "secondary.contrastText",
            },
          }}
          primary={title}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItem;
