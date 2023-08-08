const generatePolicy = (effect, methodArn) => {
    if (!effect || !methodArn) return null;

    return {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "execute-api:Invoke",
                Effect: effect,
                Resource: methodArn
            }
        ]
    };
}

export function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicy(effect, methodArn);

    return {
        principalId,
        policyDocument
    };
}
