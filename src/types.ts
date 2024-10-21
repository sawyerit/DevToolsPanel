export type ApplicationMessage = {
  message: string;
  error: string;
};

export type JWTPayload = {
  access_token: string;
  legacy_token: string;
  user_id: number;
  email: string;
  permissions?: string[];
  iss: string;
};

export interface TabProps {
  setStatusMessage: (message: string) => void;
}