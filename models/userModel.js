import pool from "../config/db.js";

const createUser = async ({
    name,
    email,
    phone,
    password,
    role = "user"
}) => {

    const query = `
        INSERT INTO users
        (name, email, phone, password, role)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,name,email,phone,role;
    `;

    const values = [
        name,
        email,
        phone,
        password,
        role
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

export {
    createUser,
    findUserByEmail
};