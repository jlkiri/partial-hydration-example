import React from "react";
import { Hydrator as ClientHydrator, ServerHydrator } from "./hydrators";
import Normal from "./normal";

let load = () => import("./test");
let Hydrator = ClientHydrator;

if (typeof window === "undefined") {
  Hydrator = ServerHydrator;
  load = () => require("./test");
}

export default function App() {
  return (
    <div>
      <Normal />
      <Hydrator load={load} />
    </div>
  );
}
