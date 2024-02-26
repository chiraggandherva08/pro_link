import React, { useState, useEffect } from "react";
import axios from "axios";
import "./portfolio.css";
import Follow from "../../components/FollowBtn/Follow";

const loadref = async (setData, server_route) => {
  const url = window.location.href.split("/");
  const user_nickname = url[url.length - 1];

  return await axios
    .get(`${server_route}/${user_nickname}`)
    .then((res) => {
      if (res.data.id[0].skills === undefined) {
        res.data.id[0].skills = [];
      }

      setData(res.data.id[0]);
    })
    .catch((err) => {
      console.warn("Error Occurred", err);
    });
};

export default function Portfolio({ server_route, client_route }) {
  const [data, setData] = useState([]);

  useEffect(() => {
      document.querySelector("title").innerHTML = `Link Pro`;
      loadref(setData, server_route);
  }, [server_route]);

  return (
    <React.Fragment>
      {data === undefined || data === "undefined" ? (
        <div>
          <h1
            style={{
              color: "rgb(230, 30, 35)",
              textAlign: "center",
              marginTop: "100px",
              minHeight: "calc(100vh - 100px)",
            }}
          >
            Cannot Find The Page
          </h1>
        </div>
      ) : (
        <div id="portfolio">
          <div className="profile">
            <img src={data.photo} referrerPolicy="no-referrer" alt="pp" />

            {(data.fname === "undefined" || data.fname === undefined,
            data.lname === "undefined" || data.lname === undefined) ? (
              <h2>-- --</h2>
            ) : (
              <h2>
                {data.fname} {data.lname}
              </h2>
            )}
            <h2 id="bio">{data.bio}</h2>
            <Follow server_route={server_route} />

            <ul id="skills" style={{ marginTop: "20px", maxWidth: "650px" }}>
              <h2> Skills</h2>
              {data.length !== 0 && data.skills.length !== 0 ? (
                data.skills.map((skill, index) => {
                  return (
                    <li className="user-skills" key={index}>
                      {skill}
                    </li>
                  );
                })
              ) : (
                <div
                  style={{
                    fontSize: "14px",
                    color: "gray",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  No Skills
                </div>
              )}
            </ul>
          </div>

          <ul id="links">
            <h2
              style={{
                fontSize: "30px",
                margin: "20px 0px 10px 0px",
                color: "white",
              }}
            >
              Socials
            </h2>
            {data.links !== undefined ? (
              Object.keys(data.links).map((platform, index) => {
                if (platform === "phoneno" || platform === "email")
                  return (
                    <li
                      key={index}
                      style={{ color: "white" }}
                      className="social-link"
                    >
                      <img
                        src={`assets/social/${platform}.svg`}
                        style={{
                          width: "25px",
                          marginRight: "10px",
                          background: "rgb(230, 255, 230)",
                          borderRadius: "50%",
                          padding: "2px",
                        }}
                        alt="link"
                      />{" "}
                      {data.links[platform]}{" "}
                    </li>
                  );
                else {
                  return (
                    <li key={index} className="social-link">
                      <img
                        src={`assets/social/${platform}.svg`}
                        style={{
                          width: "25px",
                          height: "25px",
                          marginRight: "10px",
                          background: "rgb(230, 255, 230)",
                          borderRadius: "50%",
                          padding: "2px",
                        }}
                        alt=""
                      />
                      <p style={{ paddingRight: "10px" }}> {platform} </p>
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={data.links[platform]}
                      >
                        {data.links[platform]}
                      </a>
                    </li>
                  );
                }
              })
            ) : (
              <div style={{ color: "white" }}>No Links</div>
            )}
          </ul>

          <hr />

          <ul id="projects">
            <h2
              style={{
                fontSize: "30px",
                margin: "20px 0px 10px 0px",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Projects
            </h2>
            {data.projects !== undefined ? (
              Object.keys(data.projects).map((project, index) => {
                return (
                  <li key={index}>
                    <h3>{project}</h3>
                    <p>{data.projects[project].disc}</p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={data.projects[project].link}
                    >
                      {data.projects[project].link}
                    </a>
                  </li>
                );
              })
            ) : (
              <div>No Projects</div>
            )}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}
