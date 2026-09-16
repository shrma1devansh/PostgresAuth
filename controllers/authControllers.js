import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModel.js";

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
   console.log("Received registration data:", req.body);
    // 1. Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2. Check if email already exists
    const existingUser = await findUserByEmail(email);
    console.log("Existing User:", existingUser)

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // 4. Save the user
    const user = await createUser({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user"
    });
    console.log("Inserted User:", user);

    // 5. Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
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

export { register };