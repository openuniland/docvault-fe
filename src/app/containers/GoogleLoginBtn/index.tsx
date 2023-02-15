import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import classNames from "classnames/bind";
import configs from "configs";
import { useState } from "react";
import { CredentialType } from "types/Authentication";

import styles from "./GoogleLoginBtn.module.scss";

const cx = classNames.bind(styles);
const clientId = configs.google.clientId;

export const GoogleLoginBtn = () => {
  const [credential, setCredential] = useState<CredentialType | null>(null);
  return (
    <div className={cx("container")}>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse: any) => {
            setCredential(credentialResponse);
            return console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>

      <span
        style={{
          display: "block",
          width: "500px",
          height: "500px",
          overflow: "auto",
        }}
      >
        {credential?.credential}
      </span>
    </div>
  );
};
