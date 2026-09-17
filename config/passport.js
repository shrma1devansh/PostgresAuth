// import passport from "passport";
// import {Strategy as SamlStrategy} from "passport-saml";

// // basically an authentication middleware for passport so saml can relate to redirection flow and callback flow
// passport.use(
//     // saml strategy is used for following saml 2.0 protocol 
//   new SamlStrategy(

//      {   
//         // 1.entry point where user will be redirected to login
//         entryPoint: process.env.SAML_ENTRY_POINT,
//         // 2.issuer is the unique identifier for your application, which is used to identify your application to the SAML provider
//         issuer: process.env.SAML_ISSUER,
//         // 3.callbackUrl is the URL where the SAML provider will redirect the user after successful authentication
//         // xml is recieved from the SAML provider and is used to verify the authenticity of the SAML response
//         callbackUrl: process.env.SAML_CALLBACK_URL,
//         // 4. contains signature and certificate information used to verify the authenticity of the SAML response
//         cert: process.env.SAML_CERT,
//     },
//     function(profile, done) {
//       // Here you can handle the user profile returned by the SAML provider 
//       return done(null, profile);
//     }
//   )
// );