import express from "express"

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    status: "server running"
  })
})

export default router;
