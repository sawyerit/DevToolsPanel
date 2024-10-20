import { ApplicationMessage, JWTPayload } from "../types";
import {
  IDENTITY_COOKIE,
  ACCESS_COOKIE,
  UNAUTHENTICATED_USER_ID,
  DOMAIN_URL,
} from "../constants";

export class PanelUtils {
  private static _instance: PanelUtils;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  async Environment(): Promise<{ env: string; pageURL: URL }> {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.url) {
      throw new URIError("The tab url was undefined");
    }
    const pageURL = new URL(tab.url);
    const env = pageURL.origin === DOMAIN_URL.pilot ? "pilot" : "prod";
    // const jobId = this.ParseJobId(pageURL);
    return { env, pageURL };
  }

  async GetFromSession(param: string): Promise<string> {
    try {
      const { env } = await PanelUtils.Instance.Environment();
      const response = await chrome.storage.session.get(env + param);
      // console.log("Get value for: " + param + " " + JSON.stringify(response))
      return response[env + param];
    } catch (error) {
      console.error("There was an issue in GetFromSession", error);
      return "";
    }
  }

  async SetInSession(keyName: string, value: string) {
    const { env } = await PanelUtils.Instance.Environment();
    console.log("Set value for: " + env + keyName + " " + value);
    await chrome.storage.session.set({ [env + keyName]: value });
  }

  async RemoveFromSession(param: Array<string>) {
    const { env } = await PanelUtils.Instance.Environment();
    await chrome.storage.session.remove(param.map((key) => env + key));
  }

  ParseJwtPayload(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload) as JWTPayload;
  }

  // Get JWTPayload from the cookies
  async GetJWTs() {
    let returnJWTPayload: JWTPayload = {
      access_token: "",
      legacy_token: "",
      user_id: UNAUTHENTICATED_USER_ID,
      email: "not authenticated",
      permissions: undefined,
      iss: "",
    };

    //get identity cookie
    const { env } = await PanelUtils.Instance.Environment();

    // get access cookie
    const accessCookie = await chrome.cookies.get({
      url: DOMAIN_URL[env as keyof typeof DOMAIN_URL],
      name: ACCESS_COOKIE,
    });

    //set the response JWTPayload to the return val, add in perms if we have them
    if (accessCookie !== null) {
      let payload = PanelUtils.Instance.ParseJwtPayload(accessCookie.value);
      returnJWTPayload = payload;
      returnJWTPayload.access_token = accessCookie.value;
    }

    //add email to the return JWTPayload
    const identityCookie = await chrome.cookies.get({
      url: DOMAIN_URL[env as keyof typeof DOMAIN_URL],
      name: IDENTITY_COOKIE,
    });
    if (identityCookie != null) {
      const payload = PanelUtils.Instance.ParseJwtPayload(identityCookie.value);
      if (payload.email != null && payload.email !== undefined) {
        returnJWTPayload.email = payload.email;
      }
    }

    return returnJWTPayload;
  }

  // Wrapper for the Fetch method that accepts a body, authInfo for legacy core
  // api calls, and headers (for sending the access cookie to the lambda backend)
  async Fetch(
    url: URL,
    method: string,
    body: string | null,
    authInfo: JWTPayload | null,
    headers?: Headers | null
  ): Promise<Response | undefined> {
    if (method !== "") {
      // adding the access token to the headers was moved out of here
      // because the admin api will reject calls with unexpected headers
      // It will only be added when calling the lambda backend
      let requestHeaders = headers ? headers : new Headers();
      requestHeaders.append("Content-Type", "application/json");
      if (authInfo !== null) {
        requestHeaders.append(
          "Authorization",
          "Bearer " + authInfo?.legacy_token
        );
      }

      //only add the body if it exists, otherwise the fetch will fail
      let payload = {
        method: method,
        headers: requestHeaders,
      };
      payload = { ...payload, ...(body ? { body: body } : {}) };

      try {
        const response: Response = await fetch(url, payload);
        return response;
      } catch (error) {
        console.error("There was an unhandled error in Utils.Fetch", error);
      }
    }
  }
}
