import React from "react";
import "./hero.css";
import { useAuth0 } from "@auth0/auth0-react";

function move_images(pointerX, pointerY) {
  var prev1 = document.getElementById("prev1");
  var prev2 = document.getElementById("prev2");

  if (prev1 === null && prev2 === null) {
    return;
  }

  if (pointerY < 1000) {
    prev1.style.transform = `skewX(${pointerX * 0.003}deg) skewY(${
      pointerY * 0.003
    }deg)`;

    prev2.style.transform = `skewX(-${pointerX * 0.003}deg) skewY(-${
      pointerY * 0.003
    }deg)`;

    prev1.style.scale = 1 - pointerY / 10000;
    prev2.style.scale = 1 - pointerY / 10000;
  }
}

window.addEventListener("mousemove", (event) => {
  move_images(event.clientX, event.clientY);
});

export default function Hero() {
  const { user } = useAuth0();

  return (
    <React.Fragment>
      <div id="hero">
        <div id="hero-text">
          Make Your Portfolio Just By Clicking
          <br />
          {user === undefined || user === null ? (
            <span>Login / Signup to continue</span>
          ) : (
            <span>You Are Logged in as {user.nickname} </span>
          )}
        </div>

        <div id="previews">
          <div id="prev1">
            <img src="assets/hero-left.png" alt="" />
          </div>

          <div id="prev2">
            <img src="assets/hero-right.png" alt="" />
          </div>
        </div>

        <div id="perks">
          <img src="assets/stats.png" alt="perks" />
        </div>
      </div>
    </React.Fragment>
  );
}
