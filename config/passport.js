import passport from "passport";
import { Strategy as SamlStrategy } from "passport-saml";
import dotenv from "dotenv";
dotenv.config();


passport.use(
  new SamlStrategy(
    {
      // 1.entry point where user will be redirected to login
      entryPoint: process.env.SAML_ENTRY_POINT,

       // 2.issuer is the unique identifier for your application, which is used to identify your application to the SAML providern
      issuer: process.env.SAML_ISSUER,

       // 3.callbackUrl is the URL where the SAML provider will redirect the user after successful authentication
       // xml is recieved from the SAML provider and is used to verify the authenticity of the SAML response
      callbackUrl: process.env.SAML_CALLBACK_URL,

       // 4. contains signature and certificate information used to verify the authenticity of the SAML response
      cert: process.env.SAML_CERT,

      // We expect the user's email as the NameID
    //   identifierFormat:
    //     process.env.SAML_IDENTIFIER_FORMAT ||
    //     "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    // },
    },
    
    async (profile, done) => {
      try {
        // Passport has already validated the SAML Response.
        // We simply pass or forward the profile to the controller.
        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});
// when connection is build during logging in this session are required to maintain the connection and till user is authenticated
// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;