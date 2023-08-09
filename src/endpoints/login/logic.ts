import * as AWS from 'aws-sdk';
import {CustomError} from "../../helpers/responses/CustomError";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const dynamodb = new AWS.DynamoDB.DocumentClient()

export const loginUser = async (email: string, password: string): Promise<string> => {
    const queryParams = {
        TableName: process.env.userTableName as string,
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
            '#email': 'email'
        },
        ExpressionAttributeValues: {
            ':email': email
        }
    }

    const userResult = await dynamodb.query(queryParams).promise();
    if (!userResult.Items[0])
        throw new CustomError(401, 'User is not registered');

    const comparePass = bcrypt.compareSync(password, userResult.Items[0].password);
    if (!comparePass) {
        throw new CustomError(403, 'Incorrect password');
    }
    const token = jwt.sign({
        email: userResult.Items[0].email
    }, 'SECRETTTTTTTTTTTTTTTTTTTT');

    if (!token)
        throw new CustomError(500, 'Error during signing token');
    return token;
}
