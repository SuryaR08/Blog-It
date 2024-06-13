const express = require("express");
const {
  addBlog,
  getAllBlogs,
  getBlogsByUser,
  deleteBlog,
  updateBlog,
  getBlogById
} = require("../controllers/blogController");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", getAllBlogs);
router.post("/", authMiddleware, upload.single("image"), addBlog);
router.get("/user", authMiddleware, getBlogsByUser);
router.delete("/:id", authMiddleware, deleteBlog);
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.get("/:id", getBlogById);


module.exports = router;
