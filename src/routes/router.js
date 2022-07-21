import express from "express"
import userRouter from "./user.route.js";
import locationRouter from "./location.route.js";
import listsRouter from "./lists.route.js";
import cityRouter from "./city.route.js";
import locationTypeRouter from "./location-types.route.js";
import postRouter from "./posts.route.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    status: "server running"
  })
})
router.use("/users", userRouter)
router.use("/locations", locationRouter)
router.use("/lists", listsRouter)
router.use("/cities", cityRouter)
router.use("/location-types", locationTypeRouter)
router.use("/posts", postRouter)

export default router;
