const router = require("express").Router();
const commentController = require("../controllers/Comment");

router.post("/add", commentController.addComment);

router.put("/update/:commentController_id", commentController.updateComment);

router.delete("/delete/:commentController_id", commentController.deleteComment);

module.exports = router;
