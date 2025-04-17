1
import userPool from './Userpool';

export const logout = () => {
    const currentUser = userPool.getCurrentUser();
    
    if (currentUser) {
        currentUser.signOut(); // Logs out the user
        localStorage.clear()
        console.log("User logged out successfully");
    }
};
