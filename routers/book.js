const router = require("express")();
const Book = require("../controllers/book");

router.get("/book", Book.checkCacheAsync, Book.getAsync);
router.post("/book", Book.insertAsync);

module.exports = router;
