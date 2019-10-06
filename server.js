import express from "express";
import path from "path";
import ssr from "./build/ssr/main.js";

const app = express();

app.use("/build", express.static(path.resolve(__dirname, "build")));

app.use(express.static(path.resolve(__dirname, "src")));

app.get("/", async (req, res) => {
  const componentStream = await ssr();

  const htmlStart = `
    <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/app.css" />
          <script type="module" defer src="/build/client.js"></script>
        </head>
        <body>
        <div id="root">
  `;

  res.write(htmlStart);

  componentStream.pipe(
    res,
    { end: false }
  );

  const htmlEnd = `
    </body>
    </html>
  `;

  componentStream.on("end", () => {
    res.write(htmlEnd);
    res.end();
  });
});

app.listen(3001, () => console.log("Listening..."));
