const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");
const index = require("./routes/index");
const users = require("./routes/users");
const frontPage = require("./routes/frontPage");
const proxy = require("koa-server-http-proxy");

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(frontPage.routes(), frontPage.allowedMethods());

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
module.exports = app;

// 启动项目是 npm run dev
// 端口是 3001
