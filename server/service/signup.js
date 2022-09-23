const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
})
const util = require('../utils/util')
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'account_data';

async function signup(userInfo) {
    const blood_pressure = userInfo.blood_pressure;
    const input = userInfo.input;
    const blank = userInfo.blank;
    const name = userInfo.name;
    const type = userInfo.type;
    const gender = userInfo.gender;
    const phone = userInfo.phone;
    const race = userInfo.race;
    const healthProvider = userInfo.healthProvider;
    const address = userInfo.address;
    const username = userInfo.username;
    const password = userInfo.password;
    if (!username || !password) {
        return util.buildResponse(401, {
            message: 'Required Fields Missing'
        })
    }

    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: 'Username Taken'
        })
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        blood_pressure: blood_pressure,
        input: input,
        blank: blank,
        name: name,
        type: type,
        gender: gender,
        phone: phone,
        race: race,
        healthProvider: healthProvider,
        address: address,
        username: username,
        password: encryptedPW
    }

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {
        return util.buildResponse(503, {
            message: 'Server Error'
        })
    }

    return util.buildResponse(200, { username: username });

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
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error('There is an error saving user: ', error);
    })
}

module.exports.signup = signup;