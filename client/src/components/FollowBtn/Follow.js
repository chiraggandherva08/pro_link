import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./follow.css";
import React, { useEffect } from "react";

async function postFollowReq(
  server_route,
  portfolioOwnerData,
  portfolio_owner
) {
  await axios
    .post(
      `${server_route}/${portfolio_owner}`,
      { data: portfolioOwnerData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((err) => {
      console.warn("Error: ", err);
    });
}

async function checkAuthAndFollow(
  isFollowing,
  setIsFollowing,
  server_route,
  portfolio_owner,
  user
) {
  setIsFollowing(!isFollowing);

  const portfolioOwnerData = await axios
    .get(`${server_route}/${portfolio_owner}`)
    .then((res) => {
      return res.data.id[0];
    })
    .catch((err) => {
      console.warn("Error: ", err);
    });

  if (portfolioOwnerData.followers === undefined) {
    portfolioOwnerData.followers = {};
  }

  const portfolioOwnerDataList = Object.keys(portfolioOwnerData.followers);

  if (portfolioOwnerDataList.includes(user.nickname)) {
    delete portfolioOwnerData.followers[user.nickname];
  } else {
    portfolioOwnerData.followers[user.nickname] = {
      fname: user.given_name,
      lname: user.family_name,
      nickname: user.nickname,
      photo: user.picture,
    };
  }

  await postFollowReq(server_route, portfolioOwnerData, portfolio_owner);

  const userData = await axios
    .get(`${server_route}/${user.nickname}`)
    .then((res) => {
      return res.data.id[0];
    })
    .catch((err) => {
      console.warn("Error: ", err);
    });

  if (userData.following === undefined) {
    userData.following = {};
  }

  const userDataList = Object.keys(userData.following);

  if (userDataList.includes(portfolio_owner)) {
    delete userData.following[portfolio_owner];
  } else {
    userData.following[portfolio_owner] = {
      fname: portfolioOwnerData.fname,
      lname: portfolioOwnerData.lname,
      nickname: portfolioOwnerData.nickname,
      photo: portfolioOwnerData.photo,
    };
  }

  await postFollowReq(server_route, userData, user.nickname);
}

async function checkForAlreadyFollowed(
  user,
  isAuthenticated,
  setIsFollowing,
  server_route,
  portfolio_owner
) {
  if (!isAuthenticated) {
    return;
  }

  const userFollowing = await axios
    .get(`${server_route}/${user.nickname}`)
    .then((res) => {
      return res.data.id[0];
    })
    .catch((err) => {
      console.warn("Error: ", err);
    });

  if (userFollowing.following === undefined) {
    userFollowing.following = {};
  }

  const userFollowingList = Object.keys(userFollowing.following);

  if (userFollowingList.includes(portfolio_owner)) {
    setIsFollowing(true);
  }
}

export default function Follow({ server_route }) {
  const { user, isAuthenticated } = useAuth0();
  const [isFollowing, setIsFollowing] = React.useState(false);
  const portfolio_owner = window.location.pathname.split("/")[1];

  useEffect(() => {
    const flwBtn = document.querySelector("#flw-btn");

    if (isFollowing) {
      flwBtn.style.backgroundColor = "black";
      flwBtn.style.color = "white";
    } else {
      flwBtn.style.backgroundColor = "white";
      flwBtn.style.color = "black";
    }
  }, [isFollowing]);

  useEffect(() => {
    const flwBtn = document.querySelector("#flw-btn");
    if (user !== undefined) {
      if (user.nickname !== portfolio_owner) {
        flwBtn.style.display = "flex";
        flwBtn.style.justifyContent = "center";

        checkForAlreadyFollowed(
          user,
          isAuthenticated,
          setIsFollowing,
          server_route,
          portfolio_owner
        );
      }
    }
  }, [user, isAuthenticated, server_route, portfolio_owner]);

  return (
    <React.Fragment>
      <button
        id="flw-btn"
        onClick={() => {
          checkAuthAndFollow(
            isFollowing,
            setIsFollowing,
            server_route,
            portfolio_owner,
            user
          );
        }}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </React.Fragment>
  );
}
