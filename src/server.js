import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./app.js";

export default async function ssr() {
  return ReactDOMServer.renderToNodeStream(<App />);
}
