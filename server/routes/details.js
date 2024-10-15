const express = require("express");
const {
  getDetails,
  getDetail,
  createDetail,
  deleteDetail,
  updateDetail,
} = require("../controllers/detailController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
router.get("/", getDetails);
router.get("/:id", getDetail);
router.post("/", createDetail);
router.delete("/:id", deleteDetail);
router.patch("/:id", updateDetail);

module.exports = router;
