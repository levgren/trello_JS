const expect = require('chai').expect;
const supertest = require('supertest');
const baseUrl = supertest("https://api.trello.com");
const endPointGet = "/1/boards/5ddfa99a1d78498e697a36ab/?filter=open&fields=all&key=afc041799d64f0a820a026fea689e7d1&token=d7d77a423a17948ba59ca3611735a40d977b10f6d2117dbc6b792860ee2a0feb";
const endPointPOstList = "/1/lists?oauth_consumer_key=afc041799d64f0a820a026fea689e7d1&oauth_token=d7d77a423a17948ba59ca3611735a40d977b10f6d2117dbc6b792860ee2a0feb&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1574941203&oauth_nonce=7DTgL0&oauth_version=1.0&oauth_signature=8l2i1HMONiHwWjY11eblc/HTbak=";
const endPointPutList = "/1/lists/5ddfb2148df1ad7c66fd41e9/?oauth_consumer_key=afc041799d64f0a820a026fea689e7d1&oauth_token=d7d77a423a17948ba59ca3611735a40d977b10f6d2117dbc6b792860ee2a0feb&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1574941212&oauth_nonce=nl2byh&oauth_version=1.0&oauth_signature=sprDZpn7bIXTfV8f305M3qUGX+w=";

var response;
var body;

const call_back_api = async function () {
    return baseUrl.get(endPointGet)
        .set('Content-Type', 'application/json')
};

describe('API GET TESTING', () => {
    before(async function () {
        response = await call_back_api();
        body = response.body;
    });

    it('status code is 200', function () {
        expect(response.status).to.equal(200);
        console.log(body)
    });

    it('should be include title', function () {
        expect(response.body.name).to.equal('NewPerfec');
        console.log(response.body.name);
    });

});

const key = 'afc041799d64f0a820a026fea689e7d1&oauth';
const token = 'd7d77a423a17948ba59ca3611735a40d977b10f6d2117dbc6b792860ee2a0feb&oauth';
const endPointPOstBoard = "/1/boards/?oauth_consumer_key=" + key + "_token=" + token + "_signature_method=HMAC-SHA1&oauth_timestamp=1574938693&oauth_nonce=p6GD0G&oauth_version=1.0&oauth_signature=KzPOZQG8cD1wEqU+aImXadm+3Qc=";
var requestBody = '{"name": "Septimious Severus"}';
var name = 'Septimious Severus';

// POST BOARD test, changing name
const call_post = async function (request_body) {
    return baseUrl.post(endPointPOstBoard)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body)
};

describe('API POST BOARD', () => {
    before(async function () {
        response = await call_post(requestBody);
        body = response.body;
    });

    it('status code is 200', function () {
        expect(response.status).to.equal(200);
    });

    it('name and id are coorect', function () {
        expect(response.body.name).to.equal(name);
        console.log('name was changed to: ' + response.body.name);
        });
});

const tv4 = require('tv4');
var schema = {
    "name":"Diva Faustina",
    "idBoard":"5ddfa99a1d78498e697a36ab"
};

//POST LIST
const call_post_list = async function (request_body) {
    return baseUrl.post(endPointPOstList)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body)
};

describe('API POST LIST', () => {
    before(async function () {
        response = await call_post_list({
            "name":"Diva Faustina",
            "idBoard":"5ddfa99a1d78498e697a36ab"
        });
        body = response.body;
    });

    it('status code is 200', function () {
        expect(response.status).to.equal(200);
        console.log(body)
    });

    it('schema is valid', function () {
        expect(tv4.validate(body, schema)).to.be.true;
    });

    it('name and id are coorect', function () {
        expect(response.body.name).to.equal('Diva Faustina');
        console.log('name =' + response.body.name);
        expect(response.body.idBoard).to.equal('5ddfa99a1d78498e697a36ab');
        console.log('idBoard =' + response.body.idBoard);
        });
});

//PUT LIST
const call_put_list = async function (request_body) {
    return baseUrl.put(endPointPutList)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body)
};

describe('API POST LIST', () => {
    before(async function () {
        response = await call_put_list({"name":"Emilianus"});
        body = response.body;
    });

    it('status code is 200', function () {
        expect(response.status).to.equal(200);
        console.log(body)
    });

    it('name and id are coorect', function () {
        expect(response.body.name).to.equal('Emilianus');
        console.log('name = ' + response.body.name);
        });
});



