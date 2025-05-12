import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData={
    UserPoolId:"ap-south-1_4dv2lqjrD",
    ClientId:"5qaqn88kaqe6et1ld9m70g82vr",
    Storage:sessionStorage
    
}
const userPool=new CognitoUserPool(poolData)

export default userPool