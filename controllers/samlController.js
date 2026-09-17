import {
    createMicrosoftUser,
    findUserByEmail
} from "../models/userModel.js";

import generateToken from "../services/jwtServices.js";

export const registerMicrosoftUser = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            microsoft_id
        } = req.body;

        const existingUser =
            await findUserByEmail(email);

        if (existingUser) {

            return res.status(409).json({

                success:false,

                message:"User already exists"

            });

        }

        const user =
            await createMicrosoftUser({

                name,

                email,

                phone,

                microsoft_id,

                provider:"microsoft"

            });

        const token =
            generateToken(user);

        return res.status(201).json({

            success:true,

            message:"Registration Successful",

            token,

            user

        });

    }

    catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:"Registration Failed"

        });

    }

};


const samlCallback = async (req, res) => {

    try {
        //   provides user ingfo
        const profile = req.user;

        const email =
            profile.email ||
            profile.nameID;

        const name =
            profile.displayName ||
            profile.cn ||
            "Unknown User";

        const existingUser =
            await findUserByEmail(email);

        if (existingUser) {

            const token =
                generateToken(existingUser);

            return res.status(200).json({
                success: true,
                registered: true,
                message: "Login Successful",
                token,
                user: existingUser

            });

        }
        return res.status(200).json({
            success: true,
            registered: false,
            message: "Please complete registration",
            user: {
                name,
                email
            }

        });

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "SAML Authentication Failed"
        });
    }
};

export {
    samlCallback
};