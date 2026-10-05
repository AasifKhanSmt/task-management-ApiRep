const express = require("express");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

router.post("/test", async (req, res, next) => {
    try {
        const { to } = req.body;

        if (!to) {
            return res.status(400).json({
                success: false,
                message: "Recipient email is required"
            });
        }

        await sendEmail(
            // to,
            // "Welcome to Task Management APP 🚀",
            // "Welcome to Task Management APP!",
            // `
            // <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">
            //     <h1 style="color: #333;">
            //             Welcome! 👋
            //         </h1>

            //         <p style="font-size: 16px;">
            //             Your account has been successfully created.
            //         </p>

            //         <p style="font-size: 16px;">
            //             You can now start managing your tasks using our Task Management API.
            //         </p>

            //         <a
            //             href="http://localhost:4000"
            //             style="
            //                 display: inline-block;
            //                 padding: 12px 20px;
            //                 background: #007bff;
            //                 color: white;
            //                 text-decoration: none;
            //                 border-radius: 6px;
            //             "
            //         >
            //             Get Started
            //         </a>

            //         <p style="margin-top: 30px; color: #777;">
            //             Thanks for joining us! 🚀
            //         </p>

            //     </div>
            // `

            to,
            "Task Completed ✅",
            "Your task has been completed successfully.",
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">
                <h1 style="color: #333;">
                    Task Completed ✅
                </h1>

                <p style="font-size: 16px;">
                    Your task has been completed successfully.
                </p>

                <p style="font-size: 16px;">
                    Keep up the great work! 🚀
                </p>
            </div>
    `



        );

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;