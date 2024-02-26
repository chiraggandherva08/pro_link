import "./create.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Toast from "../Toast/Toast";

async function loadref(nickname, setData, user, server_route) {
  if (user.family_name === undefined || user.given_name === undefined) {
    user.family_name = "--";
    user.given_name = "--";
  }

  return await axios
    .get(
      `${server_route}/${nickname}?nickname=${user.nickname}&photo=${user.picture}&fname=${user.given_name}&lname=${user.family_name}&email=${user.email}`
    )
    .then((res) => {
      if (res.data !== undefined) {
        if (res.data.id[0].skills === undefined) {
          res.data.id[0].skills = [];
        }

        setData(res.data.id[0]);
      } else {
        setData([]);
      }
    })
    .catch((err) => {
      console.warn("Error Occurred", err);
    });
}

async function fetchAllSkills(server_route, setSkills) {
  const skills = await axios
    .get(`${server_route}/api/skills`)
    .catch((error) => {
      console.warn("Error: ", error);
    });

  setSkills(skills.data.skills);
}

async function SaveChanges(data, nickname, server_route) {
  await axios
    .post(
      `${server_route}/${nickname}`,
      { data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.warn("Error Occurred", err);
    });

  document.querySelector("#toast").style.display = "flex";

  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

function addSocialLink(data, setData) {
  const platform = document.querySelector("#platform-ip").value.trim();
  const url = document.querySelector("#platform-url-ip").value.trim();

  if (!platform || !url) {
    return;
  }

  try {
    data.links[platform] = url;
    setData({ ...data });
  } catch {
    data.links = {};
    data.links[platform] = url;
    setData({ ...data });
  }

  document.querySelector("#platform-url-ip").value = "";
}

function addProjectLink(data, setData) {
  const projectName = document.querySelector("#project-name-ip").value.trim();
  const projectDisc = document.querySelector("#project-disc-ip").value.trim();
  const projectUrl = document.querySelector("#project-url-ip").value.trim();

  if (!projectName || !projectDisc || !projectUrl) {
    return;
  }
  try {
    data.projects[projectName] = {
      link: projectUrl,
      disc: projectDisc,
    };
  } catch (err) {
    data.projects = {};
    data.projects[projectName] = {
      link: projectUrl,
      disc: projectDisc,
    };
  }

  setData({ ...data });

  document.querySelector("#project-name-ip").value = "";
  document.querySelector("#project-disc-ip").value = "";
  document.querySelector("#project-url-ip").value = "";
}

function editSocialLink(data, platform, platform_list) {
  const Options = document.querySelector("#platform-ip");
  const index_ = platform_list.indexOf(platform.toLowerCase());

  Options.selectedIndex = index_;

  document.querySelector("#platform-url-ip").value = data.links[platform];
}

function deteteSocialLink(data, platform, setData) {
  delete data.links[platform];
  setData({ ...data });
}

export default function Create({ server_route, client_route }) {
  const platform_list = [
    "discord",
    "email",
    "facebook",
    "github",
    "instagram",
    "linkedin",
    "phoneno",
    "twitch",
    "twitter",
    "youtube",
  ];

  const { user } = useAuth0();
  const [data, setData] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (user !== undefined) {
      loadref(user.nickname, setData, user, server_route);
      fetchAllSkills(server_route, setSkills);
    }
  }, [user, server_route]);

  useEffect(() => {
    const text_area = document.querySelector("#add-bio-textarea");
    const visiblity = document.querySelector("#visiblity");

    if (text_area !== null) {
      const visiblity_options = ["public", "unlisted"];
      const index_ = visiblity_options.indexOf(data.visiblity);

      document.querySelector("#add-bio-textarea").value = data.bio;
      visiblity.selectedIndex = index_;
    }
  }, [data]);

  return (
    <React.Fragment>
      {data === undefined || data === "undefined" ? (
        <React.Fragment></React.Fragment>
      ) : (
        <div id="create-page">
          <h1
            style={{
              fontSize: "30px",
              margin: "20px 0px 10px 0px",
              color: "white",
            }}
          >
            Your Dashboard
          </h1>
          {user !== undefined && data.length !== 0 ? (
            <React.Fragment>
              <button
                id="submit-btn"
                onClick={() => {
                  SaveChanges(data, user.nickname, server_route);
                }}
              >
                Save Changes
              </button>
              <a
                href={`${client_route}/${user.nickname}`}
                target="_blank"
                rel="noreferrer"
                id="visit"
              >
                {" "}
                Visit Your Portfolio{" "}
              </a>
            </React.Fragment>
          ) : (
            <div></div>
          )}
          <ul>
            {user !== undefined && data.length !== 0 ? (
              <div id="profile" style={{ background: "inherit" }}>
                <img src={data.photo} referrerPolicy="no-referrer" alt="pp" />
                {data.fname !== undefined || data.lname !== undefined ? (
                  <h2
                    style={{
                      textAlign: "center",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    {data.fname} {data.lname}
                  </h2>
                ) : (
                  <h2
                    style={{
                      textAlign: "center",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    -- --
                  </h2>
                )}
                <div id="change-name">
                  <input
                    type="text"
                    placeholder="First Name"
                    onChange={(event) => {
                      data.fname = event.target.value.trim();
                      setData({ ...data });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={(event) => {
                      data.lname = event.target.value.trim();
                      setData({ ...data });
                    }}
                  />
                </div>
                <p id="bio"> {data.bio} </p>

                <div id="add-bio">
                  <textarea
                    id="add-bio-textarea"
                    placeholder="Edit your bio..."
                    onChange={() => {
                      data.bio =
                        document.querySelector("#add-bio-textarea").value;
                      setData({ ...data });
                    }}
                    spellCheck={false}
                    name="bio"
                    cols="50"
                    rows="1"
                  ></textarea>
                </div>
              </div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </ul>

          <ul id="socials">
            <h2> Your Links</h2>
            {user !== undefined &&
            data.length !== 0 &&
            data.links !== undefined ? (
              Object.keys(data.links).map((platform, index) => {
                return (
                  <li className="social-links" key={index}>
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
                      alt="social media icon"
                    />
                    <p style={{ paddingRight: "10px" }}> {platform} </p>

                    {platform === "phoneno" || platform === "email" ? (
                      <span
                        style={{
                          fontSize: "13px",
                          color: "gray",
                        }}
                      >
                        {data.links[platform]}{" "}
                      </span>
                    ) : (
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={data.links[platform]}
                      >
                        {data.links[platform]}
                      </a>
                    )}

                    <div className="delete-edit">
                      <img
                        src="assets/edit.svg"
                        alt="edit"
                        onClick={() => {
                          editSocialLink(data, platform, platform_list);
                        }}
                      />
                      <img
                        src="assets/delete.svg"
                        alt="delete"
                        onClick={() => {
                          deteteSocialLink(data, platform, setData);
                        }}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <React.Fragment></React.Fragment>
            )}

            <div id="add-social-link">
              <select name="platform" defaultValue={"email"} id="platform-ip">
                {platform_list.map((platform, index) => {
                  return (
                    <option key={index} value={platform}>
                      {platform}
                    </option>
                  );
                })}
              </select>
              <input type="text" id="platform-url-ip" placeholder="Enter URL" />
              <button
                id="platform-add"
                onClick={() => {
                  addSocialLink(data, setData);
                }}
              >
                Add/Edit Link
              </button>
            </div>
          </ul>

          <hr />

          <ul
            id="projects"
            style={{ marginTop: "20px", maxWidth: "calc(650px)" }}
          >
            <h2>Your Projects</h2>
            {user !== undefined &&
            data.length !== 0 &&
            data.projects !== undefined ? (
              Object.keys(data.projects).map((project, index) => {
                return (
                  <li key={index}>
                    <h3> {project} </h3>
                    <p> {data.projects[project].disc} </p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "12px" }}
                      href={data.projects[project].link}
                    >
                      {data.projects[project].link}{" "}
                    </a>
                    <div>
                      <img
                        style={{
                          width: "20px",
                          marginTop: "10px",
                        }}
                        id="delete-project"
                        src="assets/delete.svg"
                        alt="delete"
                        onClick={() => {
                          delete data.projects[project];
                          setData({ ...data });
                        }}
                      />
                      <img
                        style={{
                          width: "22px",
                          marginLeft: "10px",
                        }}
                        id="edit-project"
                        src="assets/edit.svg"
                        alt="edit"
                        onClick={() => {
                          document.querySelector("#project-name-ip").value =
                            project.trim();
                          document.querySelector("#project-disc-ip").value =
                            data.projects[project].disc.trim();
                          document.querySelector("#project-url-ip").value =
                            data.projects[project].link.trim().toLowerCase();
                        }}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <div></div>
            )}
            <div id="add-project-link">
              <input
                type="text"
                id="project-name-ip"
                placeholder="Enter Project Name"
              />
              <input
                type="text"
                id="project-disc-ip"
                placeholder="Tell us about your project"
              />
              <input type="text" id="project-url-ip" placeholder="Enter URL" />
              <button
                id="project-add"
                onClick={() => {
                  addProjectLink(data, setData);
                }}
              >
                Add/Edit Project
              </button>
            </div>
          </ul>

          <hr />

          <ul id="skills" style={{ marginTop: "20px", maxWidth: "650px" }}>
            <h2> Your Skills</h2>
            {data.length !== 0 && data.skills.length !== 0 ? (
              data.skills.map((skill, index) => {
                return (
                  <li
                    className="user-skills"
                    key={index}
                    onClick={() => {
                      data.skills.splice(index, 1);
                      setData({ ...data });
                    }}
                  >
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
                No Skills Added!
              </div>
            )}

            <hr
              style={{
                borderStyle: "dasshed",
              }}
            />

            {skills.map((skill, index) => {
              if (data.skills !== undefined && !data.skills.includes(skill)) {
                return (
                  <li
                    className="all-skills"
                    onClick={() => {
                      data.skills.push(skill);
                      setData({ ...data });
                    }}
                    key={index}
                  >
                    {skill}
                  </li>
                );
              }
            })}
          </ul>

          <div id="visiblity-section">
            <img
              src="assets/danger.svg"
              alt="danger"
              style={{
                width: "50px",
                marginTop: "40px",
                opacity: "0.5",
              }}
            />
            <label htmlFor="visiblity">Visiblity</label>
            <select
              name="visiblity"
              id="visiblity"
              onChange={() => {
                data.visiblity = document.querySelector("#visiblity").value;
                setData({ ...data });
              }}
            >
              <option value="public">Public</option>
              <option value="unlisted">
                Unlisted / You can share the link
              </option>
            </select>
          </div>
        </div>
      )}

      <Toast prompt={"Changes Saved"} />
    </React.Fragment>
  );
}
