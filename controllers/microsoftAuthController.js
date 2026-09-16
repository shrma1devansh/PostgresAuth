import {
    getMicrosoftAuthUrl,
    getTokenByCode
} from "../services/msalServices.js";

const microsoftLogin = async (req, res) => {
    try {
        const authUrl = await getMicrosoftAuthUrl();
        return res.redirect(authUrl);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to Login with Microsoft"
        });
    }
};
const microsoftCallback = async (req, res) => {
    try {

        const { code } = req.query;

        console.log("Code:", code);

        const tokenResponse = await getTokenByCode(code);

        console.log("Token Response:", tokenResponse);

        return res.json(tokenResponse);

    } catch (error) {

        console.error("FULL ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export {
    microsoftLogin,
    microsoftCallback
};