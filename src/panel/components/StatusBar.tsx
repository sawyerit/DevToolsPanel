import React, { FC, ReactNode } from "react";
import "./StatusBar.css";
 
interface StatusBarProps {
    message: string
}
const StatusBar: FC<StatusBarProps> = ({message}) => {
 return (
    <div className="status-bar"><div className="status-msg">{message}</div></div>
 );
};
 
export default StatusBar;

