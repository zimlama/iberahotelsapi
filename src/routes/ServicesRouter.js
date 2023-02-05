const { Router } = require("express");
const {
  getAllServices,
  postNewServices,
} = require("../controllers/servicesControllers.js");
const { Services } = require("../db.js");
const router = Router();

router.get("/", getAllServices);
router.post("/create", postNewServices);

module.exports = router;
