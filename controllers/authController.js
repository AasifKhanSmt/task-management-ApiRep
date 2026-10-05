
const authService = require("../services/authService");

const registerUser = async (req, res, next) => {
    try {

        console.log("REGISTER BODY:", req.body);

        const { name, email, password } = req.body;

        if (!name || typeof name !== "string" || name.trim().length <= 3) {
            return res.status(400).json({
                success: false,
                message: "Name is required and must be at least 3 characters long"
            });
        }

        if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
            return res.status(400).json({
                success: false,
                message: "Email is required and must be a valid email address"
            });
        }

        if (!password || password.trim().length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password is required and must be at least 6 characters long"
            });
        }

        const user = await authService.registerUser(name.trim(), email.trim().toLowerCase(), password);

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user
        });
    } catch (error) {
        console.log("REGISTER ERROR:", error);
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log("BODY:", req.body);
        console.log("PASSWORD:", password);
        console.log("PASSWORD TYPE:", typeof password);
        console.log("PASSWORD LENGTH:", password?.length);

        if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (!password || password.trim().length < 6) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid password."
            });
        }

        const result = await authService.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        next(error);
    }

};

module.exports = {
    registerUser,
    loginUser
}