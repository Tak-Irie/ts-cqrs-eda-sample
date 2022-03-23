import React from "react";

export interface AuthContextType {
  authStatus: boolean;
  setAuthStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAuthContext: AuthContextType = {
  authStatus: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthStatus: (value) => {},
};

// used for reRender hook
export const AuthContext =
  React.createContext<AuthContextType>(initialAuthContext);
