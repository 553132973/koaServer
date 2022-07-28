const router = require("koa-router")();
const DB = require("../config/db.js");

router.prefix("/api/v1"); // 加前缀

router.get("/article", async (ctx, next) => {
  var result = await DB.find("article", {});
  console.log("result====>>>>", result);
  ctx.body = {
    res: 1,
    data: [...result],
    status_Code: 200,
  };
});

router.get("/bar", function (ctx, next) {
  ctx.body = [
    { name: "富贵", age: 1, id: 313231 },
    { name: "翠花", age: 2, id: 3232312132 },
    { name: "大头", age: 3, id: 55443435 },
    { name: "黄杰辉是个傻吊", age: 3, id: 343343 },
  ];
});

module.exports = router;
