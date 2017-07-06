const expect  = require('chai').expect;
const { send } = require('./index');

const uid = process.env.uid;
const password = process.env.password;
const mobile = process.env.mobile;

describe('send sms', function() {
    it('all empty params', async function() {
        const result = await send('', '', '', '', '', '');
        expect(result.error).to.equal('return format error: -300, 帳號密碼不得為空值。');
    });

    it('wrong password', async function() {
        const result = await send(uid, '1234', '', '', '', '');
        expect(result.error).to.equal('return format error: -101, 密碼錯誤。');
    });

    it('complete message', async function() {
        const result = await send(uid, password, '', 'test message from mocha', mobile, '');
        expect(result.error).to.equal(null);
    });
});
