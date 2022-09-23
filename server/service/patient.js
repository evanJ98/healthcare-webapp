const AWS = require('aws-sdk');
const S3 = new AWS.S3();
AWS.config.update({
    region: "us-east-1"
})
const util = require('../utils/util')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'account_data';

async function patient(userInfo) {
    //const blood_pressure = userInfo.blood_pressure;
    const ppg = userInfo.ppg;
    // const blank = userInfo.blank;
    // const name = userInfo.name;
    // const type = userInfo.type;
    // const gender = userInfo.gender;
    // const phone = userInfo.phone;
    // const race = userInfo.race;
    // const healthProvider = userInfo.healthProvider;
    // const address = userInfo.address;
    const username = userInfo.username;
    // if (!username || !password) {
    //     return util.buildResponse(401, {
    //         message: 'Required Fields Missing'
    //     })
    // }

    const dynamoUser = await getUser(username);
    // if (dynamoUser && dynamoUser.username) {
    //     return util.buildResponse(401, {
    //         message: 'Username Taken'
    //     })
    // }

    // const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        // blood_pressure: blood_pressure,
        ppg: ppg,
        // blank: blank,
        // name: name,
        // type: type,
        gender: dynamoUser.gender,
        // phone: phone,
        race: dynamoUser.race,
        // healthProvider: healthProvider,
        // address: address,
        username: username
    }

    const uploadResponse = await uploadS3(user);
    if (!uploadResponse) {
        return util.buildResponse(503, {
            message: 'S3 Error'
        })
    }

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {
        return util.buildResponse(503, {
            message: 'Server Error'
        })
    }

    return util.buildResponse(200, { username: username });

}

async function uploadS3(user) {
    const params = {
        Bucket: "sagemaker-us-east-1-522170009381",
        Key: `upload-to-s3/${user.username}`,
        Body: JSON.stringify(user),
        ContentType: 'application/json; charset=utf-8'
    }

    return await S3.putObject(params).promise().then(response => {
        return true;
    }, error => {
        console.error('There is an error uploading to S3: ', error);
    })
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }

    }

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error getting user: ', error);
    })

}

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Key: {
            username: user.username
        },
        UpdateExpression: 'set ppg = :r',
        ExpressionAttributeValues: {
            ':r': user.ppg,
        },
    }
    return await dynamodb.update(params).promise().then(() => {
        return true;
    }, error => {
        console.error('There is an error saving user: ', error);
    })
}

module.exports.patient = patient;