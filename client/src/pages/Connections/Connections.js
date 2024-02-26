import React, { useState, useEffect } from "react";
import Connection from "../../components/Connection/Conection";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Menu from "../../components/Menu/Menu";

async function getConnections(nickname, server_route, setConnections) {
  await axios
    .get(`${server_route}/connections?nickname=${nickname}`)
    .then((response) => {
      setConnections(response.data);
    })
    .catch((error) => {
      console.warn("Error: ", error);
    });
}

export default function Connections({ server_route, client_route }) {
  const [connections, setConnections] = useState({});
  const { user } = useAuth0();

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    getConnections(user.nickname, server_route, setConnections);
  }, [user, server_route]);

  return (
    <React.Fragment>
      <Menu></Menu>
      {Object.keys(connections).length !== 0 ? (
        <Connection
          connection_list={connections}
          server_route={server_route}
          client_route={client_route}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}

// https://dev-se8z3frervfovzdh.us.auth0.com/u/login?state=hKFo2SBodnNvV3hKSG41ZEJGdzhnYmhBdEhSMFhYc0h1U0l0UaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEdRSlN1amk4ZnRtS0ZaemdfUlJTZWt5UlZMTVNpZHJPo2NpZNkgSkk3NnE5TW9RZGZkMEg4aGhPbjBsalIzbWx0aWtyWnk
