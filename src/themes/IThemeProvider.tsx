import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "store";
import mainColor from "styles/palette.scss";

interface Props {
  children: JSX.Element;
}

export const IThemeProvider = ({ children }: Props) => {
  const mode = useSelector((state: RootState) => state.system.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: mainColor.primary,
            light: mainColor.primary,
            dark: mainColor.secondary,
          },
          mode: mode as "light" | "dark",
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
