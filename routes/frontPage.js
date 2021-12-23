const router = require("koa-router")();
const monk = require("monk");
const url = "localhost:27017/dbs";
const db = monk(url);
const collection = db.get("billDetail");
const cancelDetailCollection = db.get("cancelDetail");
const dbsUser = db.get("user");

router.get("/bar", async (ctx, next) => {
  ctx.response.body = {
    result: 1,
    data: {
      val: 1,
      age: 1,
      name: "王大锤",
    },
  };
});

router.post("/add", async (ctx, next) => {
  let data = await cancelDetailCollection.insert(insert);
  console.log("data:", data);
  ctx.response.body = { status: 200, msg: "添加ssss成功", data: data };
});

router.get("/getData", async (ctx, next) => {
  console.log(ctx);
  let data = await dbsUser.find();
  ctx.response.body = { status: 200, msg: "添加成功", data: data };
});

router.post("/insertData", async (ctx, next) => {
  const data = ctx.request.body;
  await dbsUser.insert(data);
  ctx.response.body = { status: 200, msg: "添加成功", data: "" };
});

module.exports = router;
