Node.js wrapper for every8d sms api.

# Usage

```
npm install every8d-sms
```

```
const sms = require('every8d-sms');
const result1 = await sms.send(uid, password, ...);
console.log(result1);

const result2 = await sms.getCredit(uid, password);
console.log(result2);
```

# Reference:

https://tw.every8d.com/E8DPortal/InformationDownload.aspx

