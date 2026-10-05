const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
    "/profile-image",
    upload.single("profileImage"),
    (req, res) => {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            file: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                mimeType: req.file.mimetype
            }
        });
    }
);

module.exports = router;