
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "./Userpool";







const log = (email, password, callback) => {
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    const user = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    user.authenticateUser(authDetails, {
        onSuccess: (session) => {
            const accessToken = session.getAccessToken().getJwtToken();
            const idToken = session.getIdToken().getJwtToken();

            console.log('✅ Login successful!');
            console.log('🔑 Access Token:', accessToken);
            console.log('🆔 ID Token:', idToken);
            
            // logger.info(`✅ Login successful for user: ${email}`);
            // logger.info(`🔑 Access Token: ${accessToken}`);
            // logger.info(`🆔 ID Token: ${idToken}`);
            callback(null, session);
        },

        onFailure: (err) => {
            console.error('❌ Login failed:', err.message);
            // logger.error(`❌ Login failed for ${email}: ${err.message}`);
            callback(err, null);
        }

        // newPasswordRequired: (userAttributes) => {
        //     console.warn('⚠️ User must set a new password.');
        //     logger.warn(`⚠️ User ${email} must set a new password.`);
        //     callback({ message: 'New password required', user: user }, null);
        // },

        // mfaRequired: (challengeName, challengeParameters) => {
        //     console.warn('⚠️ MFA required.');
        //     logger.warn(`⚠️ MFA required for user ${email}.`);
        //     callback({ message: 'MFA required', challengeName, challengeParameters }, null);
        // }
    });
};

export default log;
