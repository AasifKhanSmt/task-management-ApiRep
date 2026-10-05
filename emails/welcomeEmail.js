const getWelcomeEmail = (name, appName) => {
    return {
        subject: `Welcome to ${appName} 🎉`,

        text: `Hi ${name},

Welcome to ${appName}!

Your account has been created successfully.

We're excited to have you with us.

Thanks,
${appName}`,

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                line-height: 1.6;
            ">

                <h1 style="color: #333;">
                    Welcome to ${appName}! 🎉
                </h1>

                <p style="font-size: 16px;">
                    Hi <strong>${name}</strong>,
                </p>

                <p style="font-size: 16px;">
                    Your account has been created successfully.
                </p>

                <p style="font-size: 16px;">
                    We're excited to have you with us! 🚀
                </p>

                <p style="margin-top: 30px; color: #777;">
                    Thanks,<br>
                    Aasif Khan ${appName} Team
                </p>

            </div>
        `
    };
};

module.exports = {
    getWelcomeEmail
};