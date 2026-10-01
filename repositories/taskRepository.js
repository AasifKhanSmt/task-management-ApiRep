const pool = require("../config/db");

const findAll = async () => {
    const result = await pool.query(
        "SELECT * FROM tasks ORDER BY id ASC"
    );

    return result.rows;
};

// const getTaskByStatus = async (status) => {
//     const result = await pool.query(
//         `SELECT * FROM tasks WHERE status = $1`,
//         [status]
//     );
//     return result.rows;
// };

// const searchTask = async (searchText) => {
//     const result = await pool.query(
//         `SELECT * FROM tasks 
//         WHERE title ILIKE $1
//         OR description ILIKE $1
//         OR status ILIKE $1`,
//         [`%${searchText}%`]
//     );

//     return result.rows;
// };

const findAllWithFilters = async (searchTerm, status, limit, offset) => {
    let whereQuery = "WHERE 1 = 1";
    const values = [];

    if (searchTerm) {
        values.push(`%${searchTerm}%`);

        whereQuery += `
            AND (
                title ILIKE $${values.length}
                OR description ILIKE $${values.length}
            )
        `;
    }

    if (status) {
        values.push(status);

        whereQuery += `
            AND status = $${values.length}
        `;
    }

    // Get total matching tasks
    const countResult = await pool.query(
        `SELECT COUNT(*) FROM tasks ${whereQuery}`,
        values
    );

    const total = Number(countResult.rows[0].count);

    // Get paginated tasks
    const paginationValues = [...values];

    paginationValues.push(limit);
    const limitPosition = paginationValues.length;

    paginationValues.push(offset);
    const offsetPosition = paginationValues.length;

    const result = await pool.query(
        `SELECT *
         FROM tasks
         ${whereQuery}
         ORDER BY id ASC
         LIMIT $${limitPosition}
         OFFSET $${offsetPosition}`,
        paginationValues
    );

    return {
        tasks: result.rows,
        total
    };
};

const getTaskById = async (taskId) => {
    const result = await pool.query(
        `SELECT * FROM tasks WHERE id = $1`,
        [taskId]
    );

    return result.rows[0];
};
const create = async (task) => {
    const result = await pool.query(
        `INSERT INTO tasks (title, description, status)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [
            task.title,
            task.description,
            task.status
        ]
    );

    return result.rows[0];
};

const update = async (taskId, taskData) => {
    const result = await pool.query(
        `UPDATE tasks
         SET title = $2,
             description = $3,
             status = $4
         WHERE id = $1
         RETURNING *`,
        [
            taskId,
            taskData.title,
            taskData.description,
            taskData.status
        ]
    );

    console.log("UPDATED TASK !!", result.rows[0]);

    return result.rows[0];
};

const remove = async (taskId) => {
    const result = await pool.query(
        `DELETE FROM tasks WHERE id = $1`,
        [taskId]
    );

    return result.rows[0];
};

module.exports = {
    findAll,
    findAllWithFilters,
    create,
    getTaskById,
    update,
    remove
};