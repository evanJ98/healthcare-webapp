const signupService = require('./service/signup');
const loginService = require('./service/login');
const verifyService = require('./service/verify');
const patientService = require('./service/patient')
const util = require('./utils/util');

const signupPath = '/signup';
const healthPath = '/health';
const loginPath = '/login';
const verifyPath = '/verify';
const patientPath = '/patient';

exports.handler = async (event) => {
    console.log("Request event: ", event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = await loginService.login(loginBody);
            break;
        case event.httpMethod === 'POST' && event.path === signupPath:
            const signupBody = JSON.parse(event.body);
            response = await signupService.signup(signupBody);
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = await verifyService.verify(verifyBody);
            break;
        case event.httpMethod === 'PUT' && event.path == patientPath:
            const patientBody = JSON.parse(event.body);
            response = await patientService.patient(patientBody);
            break;
        default:
            response = util.buildResponse(404, '404 NOT FOUND');
    }
    return response;
};
