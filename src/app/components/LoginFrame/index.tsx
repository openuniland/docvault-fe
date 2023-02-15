import { useGoogleLogin } from "@react-oauth/google";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useLogin } from "mutations/auth";
import { ButtonCustomization } from "../ButtonCustomization";
import styles from "./LoginFrame.module.scss";
import { ReactComponent as GoogleIcon } from "assets/images/googleIcon.svg";
import { Logo } from "../Logo";

const cx = classNames.bind(styles);

export const LoginFrame = () => {
  const { mutateAsync } = useLogin();
  const { t } = useTranslation();

  const handleCallGoogleApi = useGoogleLogin({
    onSuccess: tokenResponse => {
      (async () => {
        const data = await mutateAsync({
          googleToken: tokenResponse.access_token,
        });
        console.log(data);
      })();
    },
    onError: error => console.log(error),
  });

  console.log("reload");

  return (
    <div className={cx("container")}>
      <Logo className={cx("logo")} />
      <div className={cx("loginFrame")}>
        <ButtonCustomization
          className={cx("button")}
          onClick={handleCallGoogleApi}
        >
          <GoogleIcon />
        </ButtonCustomization>
        <div className={cx("textWrapper")}>
          <p>{t("login.termsAndCondition.text")}</p>
          <Link to={"/"}>{t("login.termsAndCondition.link")}</Link>
        </div>
      </div>
    </div>
  );
};
