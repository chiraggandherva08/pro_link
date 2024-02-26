import React, { useEffect, useState } from "react";
import axios from "axios";

import "./search.css";

function getAllPortfolios(setPortfolios, server_route) {
  axios
    .get(server_route)
    .then((response) => {
      setPortfolios(response.data);
    })
    .catch((err) => {
      console.warn("Error occures: ", err);
    });
}

export default function Search({ server_route, client_route }) {
  const [portfolios, setPortfolios] = useState([]);
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    getAllPortfolios(setPortfolios, server_route);
  }, [server_route]);

  return (
    <React.Fragment>
      <div id="search-page">
        <div
          id="hero-text"
          style={{
            paddingTop: "30px",
            paddingBottom: "30px",
            width: "calc(100% - 100px)",
          }}
        >
          Search Portfolios Just By Typing
          <br />
          <span style={{ fontSize: "18px", marginTop: "20px" }}>
            Type the name of the freelancer{" "}
          </span>
        </div>{" "}
        <input
          id="input-port"
          spellCheck={false}
          type="text"
          placeholder="Search Portfolios..."
          onChange={(e) => {
            setInputName(e.target.value.toLowerCase().trim());
          }}
        />
        {inputName !== "" ? (
          <ul id="portfolio-links">
            {portfolios.map((portfolio, index) => {
              if (portfolio.nickname.includes(inputName)) {
                return (
                  <li className="portfolio-list" key={index}>
                    <img src={portfolio.photo} referrerPolicy="no-referrer" alt="profile-pic" />

                    <a
                      href={`${client_route}/${portfolio.nickname}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {portfolio.fname === undefined ||
                      portfolio.fname === "undefined" ||
                      portfolio.lname === undefined ||
                      portfolio.lname === "undefined" ? (
                        <p className="username"> -- --</p>
                      ) : (
                        <p className="username">
                          {" "}
                          {portfolio.fname + " " + portfolio.lname}{" "}
                        </p>
                      )}

                      <p className="port-link">{`${client_route}/${portfolio.nickname}`}</p>
                    </a>
                  </li>
                );
              }
            })}{" "}
          </ul>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
