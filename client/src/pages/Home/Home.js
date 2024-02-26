import "./home.css";
import React, { useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import Create from "../../components/Create/Create";
import Hero from "../../components/Hero/Hero";

import { useAuth0 } from "@auth0/auth0-react";

export default function Home({ server_route, client_route }) {
  const { user } = useAuth0();
  useEffect(() => {}, [user]);

  return (
    <React.Fragment>
      <Menu />
      <Hero />

      {user !== undefined ? (
        <Create
          nickname={user.nickname}
          server_route={server_route}
          client_route={client_route}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
