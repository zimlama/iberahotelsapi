const { Router } = require("express");
const {
    postReview,
    getReviewsByHotelId,
    deleteReview
} = require("../controllers/reviewsControllers");

const router = Router();


router.post("/create", postReview);
router.get("/:hotelId",getReviewsByHotelId)
router.delete("/:id",deleteReview)


module.exports = router;
