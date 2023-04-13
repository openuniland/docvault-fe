import "./GlobalStyles.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Props {
  children: JSX.Element;
}

const GlobalStyles = ({ children }: Props) => {
  const mode = useSelector((state: RootState) => state.system.mode);

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  return children;
};

export default GlobalStyles;
