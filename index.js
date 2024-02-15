const { serve } = require("@hono/node-server");
const { Hono } = require("hono");
const url = require("node:url");

const app = new Hono();
app.get("/", (req, res) => {
  console.log("start API");
  const url_parse = url.parse(req.url, true);
  const worker = new Worker("./worker.js");
  const msgStart = "";
  const msgEnd = "";

  worker.addEventListener("message", (e) => {
    console.log(e);

    res.text("msg");
  });

  worker.postMessage({
    action: "start",
    args: [Number(url_parse.query.number)],
  });
});

serve(app);
