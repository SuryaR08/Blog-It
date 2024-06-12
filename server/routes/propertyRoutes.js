const express = require("express");
const {
  addProperty,
  getAllProperties,
  getPropertiesByUser,
  deleteProperty,
  updateProperty,
  getPropertyById,
  rentProperty
} = require("../controllers/propertyController");
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

router.get("/", getAllProperties);
router.post("/", authMiddleware, upload.single("image"), addProperty);
router.get("/user", authMiddleware, getPropertiesByUser);
router.delete("/:id", authMiddleware, deleteProperty);
router.put("/:id", authMiddleware, upload.single("image"), updateProperty);
router.get("/:id", getPropertyById);

router.post('/rent/:propertyId', authMiddleware, rentProperty);

module.exports = router;
