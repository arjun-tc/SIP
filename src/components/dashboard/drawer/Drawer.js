import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleProfile, handleResize, drawerData } from "../../../app/redux/drawerSlice";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Avatar from "@mui/material/Avatar";
import userLogo from "../../static/images/avatar/1.jpeg";
import SIPLogo from "../../static/images/Logo/SIP.png";

// Material icons
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "red",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashboardDrawer() {
  const drawerState = useSelector(drawerData);
  const dispatch = useDispatch();

  useEffect(() => {
    
    window.addEventListener("resize", () => {dispatch(handleResize(window.innerWidth));});
  });
  return (
    <Drawer variant="permanent" open={drawerState.drawerOpen}>
      {/* {drawerState.drawerOpen ? <DrawerHeader sx={{height:'64px', display: { xs: 'none', sm: 'flex' } }} ></DrawerHeader> : */}
      <DrawerHeader
        sx={{
          height: "64px",
          display: drawerState.drawerOpen ? { xs: "none", sm: "flex" } : "flex",
        }}
      >
        <Button
          variant="text"
          sx={{
            flexGrow: 1,
            fontSize: 30,
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 50, height: 50, marginTop: -2 }}
            srcSet={SIPLogo}
          />{" "}
          SIP
        </Button>
      </DrawerHeader>

      <Divider />
      <List>
        <ListItemButton
          sx={{ paddingLeft: "8px" }}
          onClick={() => dispatch(toggleProfile())}
        >
          <ListItemIcon>
            <Avatar alt="Remy Sharp" srcSet={userLogo} />
          </ListItemIcon>
          <ListItemText primary="Arjun" />
          {drawerState.profileOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={drawerState.profileOpen} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Divider />
      <List>
        {["Transition"].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <TransferWithinAStationIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
