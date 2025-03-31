import { CognitoUserPool } from 'amazon-cognito-identity-js';
import userPool from './Userpool';

export const logout = () => {
    const currentUser = userPool.getCurrentUser();
    
    if (currentUser) {
        currentUser.signOut(); // Logs out the user
        console.log("User logged out successfully");
    }
};
