const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

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
        { expiresIn: "1d" }
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