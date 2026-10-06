
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    const { data, error } = await resend.emails.send({
        from: "Task Management API <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
        html
    });

    if (error) {
        console.error("Email sending failed:", error);

        throw new Error(error.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data);

    return data;
};

module.exports = {
    sendEmail
};

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// const sendEmail = async (to, subject, text, html) => {
//     const result = await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         text,
//         html
//     });

//     console.log("Email sent:", result.messageId);

//     return result;
// };