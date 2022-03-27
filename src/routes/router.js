import express from "express"
import userRouter from "./user.route.js";
import locRouter from "./location.route.js";

const router = express.Router();


router.get("/", (req, res, next) => {
  res.json({
    status: "server running"
  })
})
router.use("/users", userRouter)
router.use("/locations", locRouter)

export default router;
