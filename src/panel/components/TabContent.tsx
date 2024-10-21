import React, { FC, ReactNode } from "react";
 
interface TabContentProps {
    id: number,
    activeTab: number,
    children: ReactNode
}
const TabContent: FC<TabContentProps> = ({id, activeTab, children}) => {
 return (
   activeTab === id ? <div className="tab-content">
     { children }
   </div>
   : null
 );
};
 
export default TabContent;