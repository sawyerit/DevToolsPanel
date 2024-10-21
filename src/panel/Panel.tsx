import React, { FC, useEffect, useState } from "react";
import { JWTPayload } from "../types";
import { PanelUtils } from "../utils/panelUtils";
import { AuthInfoContext } from "../components/appcontext";
import Tabs from "./components/Tabs";
import SettingsPanel from "./components/SettingsPanel";
import './Panel.css'

const Panel: FC = (): JSX.Element => {
  const [authInfo, setAuthInfo] = useState<JWTPayload | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    <div className="panel">
      <AuthInfoContext.Provider value={authInfo}>
        <div className={`settings-container ${isSettingsOpen ? "open" : ""}`}>
          <button
            className="settings-icon"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            ⚙️
          </button>
          <SettingsPanel isOpen={isSettingsOpen} />
        </div>
        <div className="main-content">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="tab-content">
            {activeTab === 0 && <div>Content for Tab 1</div>}
            {activeTab === 1 && <div>Content for Tab 2</div>}
          </div>
        </div>
      </AuthInfoContext.Provider>
    </div>
  );
};

export default Panel;
