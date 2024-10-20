import { createContext } from "react";
import { JWTPayload } from "../types";

/** 
* The JWTPayload is retrieved in the App component and saved in state,
then passed this context provider.

* The AuthInfoContext wraps all the components and hands this payload
to the child components
**/
export const AuthInfoContext = createContext<JWTPayload | null>(null);
