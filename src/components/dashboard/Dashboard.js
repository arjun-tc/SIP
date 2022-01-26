import * as React from "react";
import Drawer from './drawer/Drawer';
import AppBar from './appbar/AppBar';
import TransitionTable from './table/TransitionTable';

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";


import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          display : "block",
          padding: "64px 0 0 0",
        }
      }
    }
  }
});

export default function DashBoard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box  component="main" sx={{ display: "flex" }}>
    <AppBar/>
    <Drawer/>   
    <TransitionTable />
    </Box>
    </ThemeProvider>
  );
}
