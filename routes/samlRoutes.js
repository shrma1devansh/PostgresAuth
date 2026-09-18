import express from "express";
import passport from "passport";

import {
    samlCallback,
    registerMicrosoftUser
} from "../controllers/samlController.js";

const router = express.Router();

// where user will be redirected to login
router.get(
    "/login",
    passport.authenticate("saml")
);

// our call back url where user will be redirected to after login
router.post(
    "/callback",
    passport.authenticate("saml",{
        failureRedirect:"/auth/saml/failure",
        session:false
    }),async (req, res) => {
        console.log(req.user);

        res.json(req.user);
    }
);

router.post(
    "/register",
    registerMicrosoftUser
);

router.get("/failure",(req,res)=>{

    res.status(401).json({
        success:false,
        message:"Authentication Failed"
    });

});

export default router;