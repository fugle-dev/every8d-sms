require('dotenv').config();
const expect  = require('chai').expect;
const { send, getCredit } = require('./index');

const uid = process.env.uid;
const password = process.env.password;
const mobile = process.env.mobile;
const sendUrl = process.env.sendUrl || 'https://biz3.every8d.com.tw/prepaid/API21/HTTP/sendSMS.ashx';
const creditUrl = process.env.creditUrl || 'https://biz3.every8d.com.tw/prepaid/API21/HTTP/getCredit.ashx';

describe('send sms', function() {
    this.timeout(5000);
    it('all empty params', async function() {
        const result = await send(sendUrl, '', '', '', '', '', '');
        expect(result.error).to.equal('return format error: -300,帳號密碼不得為空');
    });

    it('empty mobile', async function() {
        const result = await send(sendUrl, uid, password, '', '', '', '');
        expect(result.error).to.equal('return format error: -27,電話號碼不得為空');
    });

    it('wrong password', async function() {
        const result = await send(sendUrl, uid, '1234', '', 'test message from mocha', mobile, '');
        expect(result.error).to.equal('return format error: -101,密碼錯誤');
    });

    it('complete message', async function() {
        const result = await send(sendUrl, uid, password, '', 'test message from mocha', mobile, '');
        expect(result.error).to.equal(null);
    });
});

describe('get credit', function() {
    this.timeout(5000);
    it('all empty params', async function() {
        const result = await getCredit(creditUrl, '', '');
        expect(result.error).to.equal('return format error: -300,帳號密碼不得為空');
    });

    it('wrong password', async function() {
        const result = await getCredit(creditUrl, uid, '1234');
        expect(result.error).to.equal('return format error: -101,密碼錯誤');
    });

    it('complete message', async function() {
        const result = await getCredit(creditUrl, uid, password);
        console.log(result);
        expect(result.error).to.equal(null);
        expect(Number(result.credit)).to.be.a('number');
    });
});
