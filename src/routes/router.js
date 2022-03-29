import express from "express"
import userRouter from "./user.route.js";
import locationRouter from "./location.route.js";
import commentRouter from "./comment.route.js";
import listsRouter from "./lists.route.js";

const router = express.Router();


router.get("/", (req, res, next) => {
  res.json({
    status: "server running"
  })
})
router.use("/users", userRouter)
router.use("/locations", locationRouter)
router.use("/comments", commentRouter)
router.use("/lists", listsRouter)

export default router;
