import {v4 as uuid} from 'uuid';
import * as AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();

export const AddUser = async (email: string, password: string) => {
    const id = uuid();
    const params = {
        TableName: process.env.userTableName as string,
        Item: {
            id,
            email,
            password
        }
    }

    const newUser = documentClient.put(params).promise();

    if (!newUser) {
        throw Error('There was an error inserting new user');
    }

    return newUser;
}
