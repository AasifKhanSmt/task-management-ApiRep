const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const { sendEmail } = require("./emailService");
const { getWelcomeEmail } = require("../emails/welcomeEmail");

const registerUser = async (name, email, password) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("In Service --> NAME", name);
    console.log("In Service --> EMAIL", email);
    console.log("In Service --> PASSWORD", hashedPassword);

    const user = await userRepository.create(name, email, hashedPassword);

    const welcomeEmail = getWelcomeEmail(
        user.name,
        process.env.APP_NAME
    );

    try {
        await sendEmail(
            user.email,
            welcomeEmail.subject,
            welcomeEmail.text,
            welcomeEmail.html
        );
        console.log("Welcome email sent successfully");
    } catch (error) {
        console.error(
            "Welcome email failed:",
            error.message
        );
    }
    return user;

};

const loginUser = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        const error = new Error("Invalid email try again with valid email");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};