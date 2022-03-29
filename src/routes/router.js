import express from "express"
import userRouter from "./user.route.js";
import locationRouter from "./location.route.js";
import cityRouter from "./city.route.js";
import locationTypeRouter from "./location-types.route.js";
import photoTypeRouter from "./photo-types.route.js";

const router = express.Router();


router.get("/", (req, res, next) => {
  res.json({
    status: "server running"
  })
})
router.use("/users", userRouter)
router.use("/locations", locationRouter)
router.use("/cities", cityRouter)
router.use("/location-types", locationTypeRouter)
router.use("/photo-types", photoTypeRouter)

export default router;
