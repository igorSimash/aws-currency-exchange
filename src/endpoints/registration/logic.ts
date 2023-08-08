import {v4 as uuid} from 'uuid';
const bcrypt = require('bcryptjs')
import * as AWS from 'aws-sdk';
import {CustomError} from "../../helpers/responses/CustomError";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const AddUser = async (email: string, password: string) => {
    const id = uuid();

    const queryParams = {
        TableName: process.env.userTableName as string,
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
            '#email': 'email'
        },
        ExpressionAttributeValues: {
            ':email': email
        }
    };

    const userResult = await dynamodb.query(queryParams).promise();

    if (userResult.Items && userResult.Items.length)
        throw new CustomError(409, 'The user is already registered');

    const params = {
        TableName: process.env.userTableName as string,
        Item: {
            id,
            email,
            password: bcrypt.hashSync(password, 10)
        }
    }

    const newUser = dynamodb.put(params).promise();

    if (!newUser) {
        throw new CustomError(500, 'There was an error inserting new user');
    }

    return newUser;
}
