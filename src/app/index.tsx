import { QueryClient, QueryClientProvider } from "react-query";
import RootLayout from "app/layouts/rootLayout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import GolobalStyles from "styles/GlobalStyles";
import configs from "configs";
import { IThemeProvider } from "themes/IThemeProvider";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();
const clientId = configs.google.clientId;

export function App() {
  const { i18n } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Helmet
          defaultTitle="Template App"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Template App" />
        </Helmet>
        <IThemeProvider>
          <StyledEngineProvider injectFirst>
            <GolobalStyles>
              <GoogleOAuthProvider clientId={clientId}>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  autoHideDuration={2000}
                >
                  <RootLayout />
                </SnackbarProvider>
              </GoogleOAuthProvider>
            </GolobalStyles>
          </StyledEngineProvider>
        </IThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
