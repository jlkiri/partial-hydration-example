import React, { useEffect } from "react";

export default function Test() {
  useEffect(() => applyEffects(), []);

  return (
    <div id="lazy">
      <div id="face">🤔</div>
    </div>
  );
}

function applyEffects() {
  const face = document.querySelector("#face");
  face.style.transition = "4s";
  face.style.transform = "rotate(720deg)";
  face.style.transitionTimingFunction = "ease-in-out";
}
