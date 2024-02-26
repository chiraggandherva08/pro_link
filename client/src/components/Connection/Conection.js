import React, { useEffect } from "react";
import "./connection.css";

export default function Connection({
  connection_list,
  server_route,
  client_route,
}) {
  useEffect(() => {
    document.querySelector(".follower-btn").classList.add("active");
    document.querySelector("#follower-list").style.display = "flex";
  }, []);

  return (
    <React.Fragment>
      <ul id="select-connections-type">
        <li
          className="follower-btn"
          onClick={() => {
            document.querySelector(".follower-btn").classList.add("active");
            document.querySelector(".following-btn").classList.remove("active");
            document.querySelector("#follower-list").style.display = "flex";
            document.querySelector("#following-list").style.display = "none";
          }}
        >
          Followers
        </li>
        <li
          className="following-btn"
          onClick={() => {
            document.querySelector(".follower-btn").classList.remove("active");
            document.querySelector(".following-btn").classList.add("active");
            document.querySelector("#follower-list").style.display = "none";
            document.querySelector("#following-list").style.display = "flex";
          }}
        >
          Following
        </li>
      </ul>

      {connection_list !== undefined || connection_list !== "undefined" ? (
        <ul id="follower-list">
          {Object.keys(connection_list.followers).length !== 0 ? (
            Object.keys(connection_list.followers).map(
              (follower_info, index) => {
                return (
                  <li key={index} className="follower">
                    <img
                      src={connection_list.followers[follower_info].photo}
                      alt="profile-pic"
                      referrerPolicy="no-referrer"
                    />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`/${connection_list.followers[follower_info].nickname}`}
                    >
                      <p
                        style={{
                          fontWeight: "1000",
                          fontFamily: "Open Sans, sans-serif",
                        }}
                      >
                        {connection_list.followers[follower_info].fname}{" "}
                        {connection_list.followers[follower_info].lname}
                      </p>
                      <p>{connection_list.followers[follower_info].nickname}</p>
                    </a>
                  </li>
                );
              }
            )
          ) : (
            <p style={{ color: "white" }}>No followers yet</p>
          )}
        </ul>
      ) : (
        <React.Fragment></React.Fragment>
      )}

      {connection_list !== undefined || connection_list !== "undefined" ? (
        <ul id="following-list">
          {Object.keys(connection_list.following).length !== 0 ? (
            Object.keys(connection_list.following).map(
              (follower_info, index) => {
                return (
                  <li key={index} className="following">
                    <img
                      src={connection_list.following[follower_info].photo}
                      alt="profile-pic"
                      referrerPolicy="no-referrer"
                    />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`/${connection_list.following[follower_info].nickname}`}
                    >
                      <p
                        style={{
                          fontWeight: "1000",
                          fontFamily: "Open Sans, sans-serif",
                        }}
                      >
                        {connection_list.following[follower_info].fname}{" "}
                        {connection_list.following[follower_info].lname}
                      </p>
                      <p>{connection_list.following[follower_info].nickname}</p>
                    </a>
                  </li>
                );
              }
            )
          ) : (
            <p style={{ color: "white" }}>You are not following anyone yet!</p>
          )}
        </ul>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
