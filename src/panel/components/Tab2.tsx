import React from "react";
import { TabProps } from "../../types";

const Tab2: React.FC<TabProps> = ({ setStatusMessage }) => {
  return (
    <div className="tabContent">
      Tab Content 2
      <button id="btn2" onClick={() => setStatusMessage("click from tab2")}>
        Show Status
      </button>
    </div>
  );
};

export default Tab2;
