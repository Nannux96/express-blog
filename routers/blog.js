const express = require("express")
const blogController = require("../controllers/blogController")

const router = express.Router();

router.get("/", blogController.index);
router.get("/:id", blogController.show);
router.post("/", blogController.store);
router.put("/:id", blogController.update);
router.patch("/:id", blogController.modify);
router.delete("/:id", blogController.destroy);

module.exports = router;