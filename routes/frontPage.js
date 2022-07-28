const router = require("koa-router")();
const monk = require("monk");
const url = "39.104.25.232:27017/local";
const db = monk(url);
const dbsUser = db.get("startup_log");
router.prefix("/api/v1"); // 加前缀

db.then(() => {
  console.log("111111111111");
});
router.post("/delete", async (ctx, next) => {
  await dbsUser.remove({ _id: "foo" });
});

router.post("/add", async (ctx, next) => {
  let data = await cancelDetailCollection.insert(insert);
  console.log("data:", data);
  ctx.response.body = { status: 200, msg: "添加ssss成功", data: data };
});

router.get("/getData", async (ctx, next) => {
  let data = await dbsUser.find();
  ctx.body = data;
});

router.post("/insertData", async (ctx, next) => {
  const data = ctx.request.body;
  await dbsUser.insert(data);
  ctx.response.body = { status: 200, msg: "添加成功", data: "" };
});

module.exports = router;
