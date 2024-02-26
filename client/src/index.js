import React from "react";
import ReactDOM from "react-dom/client";
import Search from "./pages/Search/Search";
import Connections from "./pages/Connections/Connections";
import Home from "./pages/Home/Home";
import Portfolio from "./pages/Portfolio/Portfolio";

import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-se8z3frervfovzdh.us.auth0.com"
      clientId="JI76q9MoQdfd0H8hhOn0ljR3mltikrZy"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                server_route={"http://localhost:8000"}
                client_route={"http://localhost:3000"}
              />
            }
          />
          <Route
            path="/connections"
            element={
              <Connections
                server_route={"http://localhost:8000"}
                client_route={"http://localhost:3000"}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                server_route={"http://localhost:8000"}
                client_route={"http://localhost:3000"}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <Portfolio
                server_route={"http://localhost:8000"}
                client_route={"http://localhost:3000"}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// https://link-pro-6ewh.onrender.com
// https://link-pro.netlify.app
