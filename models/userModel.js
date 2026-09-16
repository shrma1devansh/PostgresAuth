import pool from "../config/db.js";

const createUser = async ({
    name,
    email,
    phone,
    password = null,
    role = "user",
    provider = "local",
    microsoft_id = null
}) => {

    const query = `
        INSERT INTO users
        (
            name,
            email,
            phone,
            password,
            role,
            provider,
            microsoft_id
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
    `;

    const values = [
        name,
        email,
        phone,
        password,
        role,
        provider,
        microsoft_id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};
const findUserByEmail = async (email) => {

    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    return result.rows[0];
};
const findUserByMicrosoftId = async (microsoftId) => {

    const result = await pool.query(
        "SELECT * FROM users WHERE microsoft_id = $1",
        [microsoftId]
    );

    return result.rows[0];
};

export {
    createUser,
    findUserByEmail,
     findUserByMicrosoftId
};