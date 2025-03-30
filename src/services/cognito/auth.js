import { CognitoUser,AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "./Userpool";
import { Amplify, Logger } from 'aws-amplify';
import awsconfig from './aws-exports';


const logger = new Logger('AmplifyLogger', 'DEBUG');
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
        
        logger.info('Login successful!');
        logger.info('Access Token:', session.getAccessToken().getJwtToken());
        logger.info('ID Token:', session.getIdToken().getJwtToken());
          
        logger.info('session >>',session);
        callback(null, session);
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
        callback(err, null);
      },
    });
  };
  
  export default log;
