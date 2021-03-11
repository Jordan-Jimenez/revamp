import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// import TokenValidation from "containers/TokenValidation";
// import Unauthenticated from "./Unauthenticated";
import Dashboard from "./Pages/Authenticated/Dashboard";
import Login from "./Pages/Unauthenticated/Login";
import TokenValidation from "./Containers/TokenValidation";

const routes = {
  unsecure: [
    { path: "/login", component: Login, exact: true },
    //   { path: "/unauthenticated", component: Unauthenticated, exact: false },
    //   {
    //     path: "/registration",
    //     component: Registration,
    //     exact: true,
    //   },
    //   {
    //     path: "/reset-password",
    //     component: ResetPassword,
    //     exact: false,
    //   },
  ],

  secure: [{ path: "/", component: Dashboard, exact: true }],
};

export const history = createBrowserHistory();

function Root() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.unsecure.map(({ path, component, exact }) => (
          <Route key={path} path={path} component={component} exact={exact} />
        ))}

        <TokenValidation>
          {/* <Layout> */}
          {routes.secure.map(({ path, component, exact }) => (
            <Route key={path} path={path} component={component} exact={exact} />
          ))}
          {/* </Layout> */}
        </TokenValidation>
      </Switch>
    </BrowserRouter>
  );
}

export default Root;
