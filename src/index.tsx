import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
// Use consistent styling
import "sanitize.css/sanitize.css";
// Initialize languages
import "./locales/i18n";

import { App } from "app";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider, ReactReduxContext } from "react-redux";
import { store } from "store";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store} context={ReactReduxContext}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
