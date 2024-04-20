const router = require("express").Router();
const commentController = require("../controllers/Comment");
const jwtValidate = require("../middleware/jwt");

router.post("/", jwtValidate, commentController.createComment);

router.put("/:commentController_id", jwtValidate, commentController.updateComment);

router.delete("/:commentController_id", jwtValidate, commentController.deleteComment);

module.exports = router;
