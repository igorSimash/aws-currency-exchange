import * as AWS from 'aws-sdk';
import {options} from "../../helpers/jest/JestWorkerOptions";
const documentClient = new AWS.DynamoDB.DocumentClient(options);

export const getCurrencies = async (TableName = process.env.currenciesTableName as string) => {
    const params = {
        TableName
    };
    const data = await documentClient.scan(params).promise();

    return data.Items;
}
