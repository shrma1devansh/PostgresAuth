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
console.log("login redirected")


// router.post("/login/callback", (req, res, next) => {
//     passport.authenticate("saml", (err, user, info) => {

     
//         console.log("ERR:", err);
//         console.log("USER:", user);
//         console.log("INFO:", info);

//         if (err) {
//             return res.status(500).json(err);
//         }

//         if (!user) {
//             return res.status(401).json(info);
//         }

//         req.user = user;

//         next();

//     })(req, res, next);

// }, samlCallback);



// router.post(
//     "/register",
//     registerMicrosoftUser
// );


router.get("/failure",(req,res)=>{

    res.status(401).json({
        success:false,
        message:"Authentication Failed"
    });

});

export default router;