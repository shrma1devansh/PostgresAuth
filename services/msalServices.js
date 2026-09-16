import cca from "../config/msalConfig.js";

const getMicrosoftAuthUrl = async () => {

    const authCodeUrlParameters = {

        scopes: [
            "openid",
            "profile",
            "email",
            "User.Read"
        ],

        redirectUri: process.env.REDIRECT_URI,

        prompt: "select_account"
    };

    return await cca.getAuthCodeUrl(authCodeUrlParameters);
};

const getTokenByCode = async (code) => {

    const tokenRequest = {

        code,

        scopes: [
            "openid",
            "profile",
            "email",
            "User.Read"
        ],

        redirectUri: process.env.REDIRECT_URI

    };

    return await cca.acquireTokenByCode(tokenRequest);
};

export {
    getMicrosoftAuthUrl,
    getTokenByCode
};