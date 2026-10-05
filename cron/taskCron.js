const cron = require("node-cron");
const taskService = require("../services/taskService");
const { sendEmail } = require("../services/emailService");

const sendReminder = async () => {
    try {
        const tasks = await taskService.findPendingTasksWithUsers();

        console.log(`PENDING TASKS: ${JSON.stringify(tasks)}`);

        for (const task of tasks) {
            await sendEmail(
                task.email,
                "Pending Task Reminder",
                `You have a pending task: ${task.title}`,
                `<h1>Pending Task Reminder</h1>
                 <p>Hello ${task.name},</p>
                 <p>You have a pending task:</p>
                 <h2>${task.title}</h2>`
            );
        }
    } catch (error) {
        console.error("Cron error:", error);
    }
};

//cron.schedule("* * * * *", sendReminder);


module.exports = {
    sendReminder
};

