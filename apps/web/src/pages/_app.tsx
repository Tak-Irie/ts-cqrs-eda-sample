import { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import "../../globals.css";

import { AuthContext } from "../util";
import { apolloClient } from "../util/createApolloClient";
import { Layout } from "../components/presentational/templates";

function CustomApp({ Component, pageProps }: AppProps) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default CustomApp;
