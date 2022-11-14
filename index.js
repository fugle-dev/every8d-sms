const rp = require('request-promise');

/**
 * send sms
 * @prarm {string} url - API url
 * @param {string} uid - login account
 * @param {string} password - login password
 * @param {string} subject - message subject only for admin use
 * @param {string} msg - message
 * @param {string} dest - phone numbers (format: 0910123456,0911123456,...)
 * @param {string} time - time to send msg (leave blank for immediate delivery)
 * @returns {object} credit,sended numbers,cost,unsend numbers,batch id,error
 */
exports.send = async function(url, uid, password, subject, msg, dest, time) {
    try {
        const result = await rp({
            uri: url || 'https://biz3.every8d.com.tw/prepaid/API21/HTTP/sendSMS.ashx',
            method: 'GET',
            qs: {
                UID: uid,
                PWD: password,
                SB: subject,
                MSG: msg,
                DEST: dest,
                ST: time,
            },
        });
        const temp = result.split(',');
        if (temp.length !== 5) {
            return {
                error: `return format error: ${result}`,
            };
        }
        return {
            credit: temp[0],
            sended: temp[1],
            cost: temp[2],
            unsend: temp[3],
            batch: temp[4],
            error: null,
        };
    } catch(e) {
        return {
            error: e.message,
        };
    }
};

/**
 * get credit
 * @prarm {string} url - API url
 * @param {string} uid - login account
 * @param {string} password - login password
 * @returns {object} credit,error
 */
exports.getCredit = async function(url, uid, password) {
    try {
        const result = await rp({
            uri: url || 'https://biz3.every8d.com.tw/prepaid/API21/HTTP/getCredit.ashx',
            method: 'GET',
            qs: {
                UID: uid,
                PWD: password,
            },
        });
        if (isNaN(Number(result))) {
            return {
                error: `return format error: ${result}`,
            };
        }
        return {
            credit: result,
            error: null,
        };
    } catch(e) {
        return {
            error: e.message,
        };
    }
};
