import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_nX8AG16qU",
    ClientId: "pu17fo97lnvfojbvogslb5lll",
};

export default new CognitoUserPool(poolData);
