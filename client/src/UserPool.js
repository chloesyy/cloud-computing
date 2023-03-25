import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_ovpSLslzb",
    ClientId: "7k3t5rv9gpsom25g296tssvsv3",
};

export default new CognitoUserPool(poolData);
