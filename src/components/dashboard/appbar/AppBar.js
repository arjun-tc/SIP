import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer, drawerData } from "../../../app/redux/drawerSlice";
import {
  openUserMenu,
  closeUserMenu,
  AppBarData,
} from "../../../app/redux/appBarSlice";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import Avatar from "@mui/material/Avatar";
import userLogo from "../../static/images/avatar/1.jpeg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SIPLogo from "../../static/images/Logo/SIP.png";

const drawerWidth = 240;
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MiniDrawer() {
  const drawerState = useSelector(drawerData);
  const AppBarState = useSelector(AppBarData);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" open={drawerState.drawerOpen}>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 0,
            display: 'flex',
            paddingLeft: "10px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleDrawer())}
            edge="start"
            sx={{ padding: 0 }}
          >
            {drawerState.drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Button
            variant="text"
            sx={{ flexGrow: 1, fontSize: 30, color: "white",  display: { xs: "flex", sm: "none" },}}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 50, height: 50, marginTop: -2 }}
              srcSet={SIPLogo}
            />
            SIP
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0, display: "flex" }}>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(event) => dispatch(openUserMenu(event.currentTarget))}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src={userLogo} />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={AppBarState.anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={AppBarState.UserMenuOpen}
            onClose={() => dispatch(closeUserMenu())}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => dispatch(closeUserMenu())}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
