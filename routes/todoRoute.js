const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController.js")

router.get("/todos", todoController.findAll)
router.get("/todos/:id", todoController.findOne)
router.post("/", todoController.create);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.softDelete);

module.exports = router;