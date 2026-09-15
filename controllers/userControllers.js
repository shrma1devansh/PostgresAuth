import { createUser } from "../models/userModel.js";

const registerUser = async (req, res) => {
    try {

        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Always create as a normal user
        const user = await createUser({
            name,
            email,
            phone,
            password, // You might want to handle password differently
            role: "user"
        });
        console.log("User Created:", user);
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export { registerUser };