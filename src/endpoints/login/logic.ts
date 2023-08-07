import * as AWS from 'aws-sdk';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
// import jwt from 'jsonwebtoken'
const dynamodb = new AWS.DynamoDB.DocumentClient()

export const loginUser = async (email: string, password: string) => {
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
    if (!userResult[0]) return null;

    const compareResult = bcrypt.compareSync(password, userResult.Items[0].password)
    if (compareResult) {
        return jwt.sign({
            email: 'asd'
        }, 'SECRETTTTTTTTTTTTTTTTTTTT')
    }
    return null;
}
