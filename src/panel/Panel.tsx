import React, { FC, useEffect, useState } from "react";
import { JWTPayload } from "../types";
import { PanelUtils } from "../utils/panelUtils";
import { AuthInfoContext } from "../components/appcontext";

const Panel: FC = (): JSX.Element => {
  const [authInfo, setAuthInfo] = useState<JWTPayload | null>(null);

  /**
   Get current cookie data and saves auth in context provider
   **/
  useEffect(() => {
    const getAppData = async () => {
      //get cookies and save user auth info in state
      setAuthInfo(await PanelUtils.Instance.GetJWTs());
    };

    //load initial app data
    getAppData().catch(console.error);
  }, []);

  return (
    <div>
      <AuthInfoContext.Provider value={authInfo}>
        <h1>Chrome DevTools Panel</h1>
        <p>Welcome {authInfo?.email} </p>
      </AuthInfoContext.Provider>
    </div>
  );
};

export default Panel;
