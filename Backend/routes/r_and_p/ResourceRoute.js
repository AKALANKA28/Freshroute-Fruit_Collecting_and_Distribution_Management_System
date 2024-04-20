// ./Backend\routes\r_and_p\ResourceRoute.js
const router = require("express").Router();
const ResourceController = require("../../controllers/r_and_p/ResourceController");

router.post("/add", ResourceController.addResource);
router.get("/", ResourceController.getAllResources);
router.get("/get/:id", ResourceController.getOneResource);
router.delete("/delete/:id", ResourceController.deleteResource);
router.put("/update/:id", ResourceController.updateResource);

module.exports = router;
