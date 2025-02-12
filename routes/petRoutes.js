const express = require("express");
const {
  getPets,
  createPet,
  deletePet,
  updatePet,
} = require("../controllers/petController.js");
const router = express.Router();

router.get("/", getPets);
router.post("/", createPet);
router.delete("/:id", deletePet);
router.patch("/:id", updatePet);

module.exports = router;
