import React, { FC, useEffect, useState, useContext } from "react";

import { Redirect } from "react-router-dom";
import TokenManager from "../Core/Authentication/TokenManager";

// import TokenManager from "core/auth/TokenManager";

// import envs from "config/envs";

// import { ApolloProvider } from "@apollo/react-hooks";

// import ApolloClient from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { setContext } from "apollo-link-context";
// import { WebSocketLink } from "apollo-link-ws";
// import { HttpLink } from "apollo-link-http";
// import { getMainDefinition } from "apollo-utilities";
// import { split } from "apollo-link";

interface ITokenValidationProps {}

enum TokenExpiredEnum {
  CHECKING,
  EXPIRED,
  NOTEXPIRED,
}

// const httpLink = new HttpLink({
//   uri: `${envs.apiBaseUrl}/graphql`,
// });

const TokenValidation: FC<ITokenValidationProps> = ({ children }) => {
  const manager = useContext(TokenManager);

  const [isExpired, setIsExpired] = useState<TokenExpiredEnum>(
    TokenExpiredEnum.CHECKING
  );

  //   const [graphqlClient, setGraphqlClient] = useState<
  //     ApolloClient<any> | undefined
  //   >();

  useEffect(() => {
    const token = manager.getToken();

    manager.setToken(token);

    if (token === undefined) {
      setIsExpired(TokenExpiredEnum.EXPIRED);
      return;
    }

    manager.storeToken(token);

    // const isExpired = manager.isExpired;

    setIsExpired(TokenExpiredEnum.NOTEXPIRED);

    // const authLink = setContext(async (_, { headers }) => {
    //   // get the authentication token from local storage if it exists
    //   const token = await manager.getToken();
    //   // return the headers to the context so httpLink can read them
    //   return {
    //     headers: {
    //       ...headers,
    //       authorization: token,
    //     },
    //   };
    // });

    // // Create a WebSocket link:
    // const wsLink = new WebSocketLink({
    //   uri: `${envs.ws!}/graphql`,
    //   options: {
    //     reconnect: true,
    //   },
    // });

    // const link = split(
    //   // split based on operation type
    //   ({ query }) => {
    //     const definition = getMainDefinition(query);
    //     return (
    //       definition.kind === "OperationDefinition" &&
    //       definition.operation === "subscription"
    //     );
    //   },
    //   wsLink,
    //   httpLink
    // );

    // const client = new ApolloClient({
    //   // uri: `${envs.serverUri}/graphql`,
    //   link: authLink.concat(link),
    //   cache: new InMemoryCache(),
    // });

    // setGraphqlClient(client);
    // // if it hasnt add the token to api client headers
  }, [manager]);

  if (isExpired === TokenExpiredEnum.CHECKING) {
    return <div />;
  }

  if (isExpired === TokenExpiredEnum.EXPIRED) {
    return <Redirect to="/login" />;
  }

  //   if (!graphqlClient) {
  //     return <div />;
  //   }

  return <div>{children}</div>;

  //   return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
};

export default TokenValidation;
