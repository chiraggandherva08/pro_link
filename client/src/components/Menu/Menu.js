import React from "react";
import "./menu.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Menu() {
  const { user, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="nav-bar">
      <div id="logo">
        <a href="/">
          <img src="/assets/logo.svg" alt="logo" />
          link.pro
        </a>
      </div>

      <ul className="nav-list">
        {user !== undefined && user !== "undefined" ? (
          <li className="nav-item">
            <a href="/connections" target="_blank">
              <img
                style={{ width: "30px", marginTop: "3px" }}
                src="assets/connections.svg"
                alt="connection"
              />
            </a>
          </li>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <li className="nav-item">
          <a href="/search" target="_blank">
            <img
              src="assets/search.svg"
              alt="search"
              style={{ width: "25px", marginTop: "3px" }}
            />
          </a>
        </li>
        {user !== undefined ? (
          <img
            referrerPolicy="no-referrer"
            src={user.picture}
            alt="pp"
            style={{
              height: "30px",
              borderRadius: "50%",
            }}
          />
        ) : (
          <div></div>
        )}
        {user !== undefined ? (
          <li
            className="nav-item"
            style={{
              cursor: "pointer",
              background: "white",
              color: "black",
              borderRadius: "15px",
              padding: "5px 10px",
              fontSize: "13px",
              width: "calc(100% - 15px)",
            }}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </li>
        ) : (
          <li className="nav-item">
            <span
              style={{
                cursor: "pointer",
                background: "rgb(40, 30, 200)",
                color: "white",
                borderRadius: "15px",
                padding: "5px 10px",
                fontSize: "13px",
                width: "calc(100% - 15px)",
              }}
              className="nav-links"
              onClick={(e) => {
                loginWithRedirect();
              }}
            >
              Login/Signup
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}
