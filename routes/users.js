const router = require("koa-router")();
const DB = require("../config/db.js");

router.prefix("/api/v1"); // 加前缀

router.get("/", async (ctx, next) => {
  var result = await DB.find("article", {});
  ctx.body = result;
});

router.get("/bar", function (ctx, next) {
  console.log(222);
  ctx.body = "this is a users/bar response";
});

module.exports = router;
