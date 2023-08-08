import {generateAuthResponse} from "./logic";
const jwt = require("jsonwebtoken");

export const handler = async (event, context, callback) => {
    const token = event.authorizationToken.replace("Bearer ", "");
    const methodArn = event.methodArn;

    if (!token || !methodArn) return callback(null, "Unauthorized");

    // verifies token
    const decoded = jwt.verify(token, 'SECRETTTTTTTTTTTTTTTTTTTT');

    if (decoded && decoded.email) {
        return callback(null, generateAuthResponse(decoded.id, "Allow", methodArn));
    } else {
        return callback(null, generateAuthResponse(decoded.id, "Deny", methodArn));
    }
}
