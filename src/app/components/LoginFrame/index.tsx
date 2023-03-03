import { useGoogleLogin } from "@react-oauth/google";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";

import { useLogin } from "mutations/auth";
import { ButtonCustomization } from "../ButtonCustomization";
import styles from "./LoginFrame.module.scss";
import { ReactComponent as GoogleIcon } from "assets/images/googleIcon.svg";
import { Logo } from "../Logo";
import { ModalCustomization } from "../ModalCustomization";
import { setTokens } from "utils/storage";

const cx = classNames.bind(styles);

export const LoginFrame = () => {
  const { mutateAsync } = useLogin();
  const { t } = useTranslation();

  const [openPropup, setOpenPropup] = useState(false);

  const handleOpenPropup = useCallback(() => {
    setOpenPropup(true);
  }, [setOpenPropup]);

  const handleClosePropup = useCallback(() => {
    setOpenPropup(false);
  }, [setOpenPropup]);

  const handleCallGoogleApi = useGoogleLogin({
    onSuccess: tokenResponse => {
      (async () => {
        try {
          const data = await mutateAsync({
            googleToken: tokenResponse.access_token,
          });
          setTokens(data);
          window.location.reload();
        } catch (error: any) {
          if (error?.errors?.errorCode === "NOT_BELONG_TO_ORGANIZATION") {
            handleOpenPropup();
          }
        }
      })();
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });

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

      <ModalCustomization
        open={openPropup}
        handleAgree={handleClosePropup}
        actionDefault
        title="Notification"
      >
        Does not belong to our organization
      </ModalCustomization>
    </div>
  );
};
