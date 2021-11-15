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
const proxy = require("koa-server-http-proxy");
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
// app.use(
//   cors({
//     origin: function (ctx) {
//       //设置允许来自指定域名请求
//       if (ctx.url === "/test") {
//         return "*"; // 允许来自所有域名请求
//       }
//       return "http://localhost:7000"; //只允许http://localhost:8080这个域名的请求
//     },
//   })
// );
app.use(
  proxy("/api/v1", {
    target: "http://localhost:7000",
    pathRewrite: { "^/api/v1": "" },
    changeOrigin: true,
  })
);
app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
console.log(111);
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;

// 启动项目是 npm run dev
// 端口是 3000
