import * as AWS from 'aws-sdk';
import {options} from "../../helpers/jest/JestWorkerOptions";
import {CustomError} from "../../helpers/responses/CustomError";
const documentClient = new AWS.DynamoDB.DocumentClient(options);

export const getCurrencies = async () => {
    const params = {
        TableName: process.env.currenciesTableName
    };
    const data = await documentClient.scan(params).promise();

    if(!data.Items)
        throw new CustomError(500, 'Error during scanning currencies table')

    return data.Items;
}
