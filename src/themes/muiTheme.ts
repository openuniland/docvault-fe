import { createTheme } from "@mui/material/styles";

import mainColor from "styles/palette.scss";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: mainColor.primary,
      light: mainColor.primary,
      dark: mainColor.secondary,
    },
    mode: "light",
  },
  components: {},
});

export default muiTheme;
