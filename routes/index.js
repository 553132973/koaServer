const router = require("koa-router")();
const DB = require("../config/db.js");
const ObjectId = require("mongodb").ObjectId;
const monk = require("monk");
const url = "localhost:27017/blog";
const db = monk(url);
const collection = db.get("billDetail");
const cancelDetailCollection = db.get("cancelDetail");
router.prefix("/index"); // 加前缀
router.get("/bar", async (ctx, next) => {
  ctx.response.body = {
    result: 1,
    data: {
      val: "ss",
      age: 1,
      name: "index",
    },
  };
});

router.post("/string", async (ctx, next) => {
  var result = await DB.add("editData", { age: ctx.request.body.age });
  ctx.response.body = result;
});
router.post("/delete", async (ctx, next) => {
  console.log(ctx);
  await dbsUser.remove({ _id: "foo" });
});
router.post("/article", async (ctx, next) => {
  console.log(222);
  var result = await DB.add("article", {
    currentTime: ctx.request.body.currentTime,
    htmlVal: ctx.request.body.htmlVal,
    title: ctx.request.body.title,
  });
  console.log(result);
  if (result) {
    ctx.response.body = { status: 200, msg: "添加成功", data: {} };
  }
});

router.post("/cancelDetail", async (ctx, next) => {
  let data = await cancelDetailCollection.find();
  console.log("data:", data);
  ctx.response.body = { status: 200, msg: "添加ssss成功", data: data };
});

router.post("/billDetail", async (ctx, next) => {
  console.log("ctx:", ctx);
  let data = await collection.find({}, { skip: 3, limit: 2 });
  ctx.response.body = { status: 200, msg: "添加成功", data: data };
});

module.exports = router;
