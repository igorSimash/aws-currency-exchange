import {Response} from "./APIResponses";

test('Response is an object', () => {
    expect(typeof Response(200, {message: 'Test message'})).toBe('object')
});

test('Response with statusCode and message gives right object', () => {
    const res = Response(200, {message: '200 code'});
    const expectedResult = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: '{"message":"200 code"}',
    }
    expect(res).toEqual(expectedResult);
});

