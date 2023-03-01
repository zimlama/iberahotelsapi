const { Router } = require("express");
const {
    postReview
} = require("../controllers/reviewsControllers");

const router = Router();


router.post("/create", postReview);


module.exports = router;
