import React from "react";
import { TabProps } from "../../types";

const Tab1: React.FC<TabProps> = ({ setStatusMessage }) => {
  return (
    <div className="tabContent">
      Tab Content 1
      <button id="btn1" onClick={() => setStatusMessage("click from tab1")}>
        Show Status
      </button>
    </div>
  );
};

export default Tab1;
