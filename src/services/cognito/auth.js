import { CognitoUser,AuthenticationDetails } from "amazon-cognito-identity-js";
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
        console.log('Login successful!');
        console.log('Access Token:', session.getAccessToken().getJwtToken());
        console.log('ID Token:', session.getIdToken().getJwtToken());
  
        callback(null, session);
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
        callback(err, null);
      },
    });
  };
  
  export default log;
