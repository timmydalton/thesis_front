import express from 'express'
import path from 'path'
import moment from 'moment'
import sortObject from 'sortobject'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function resolveUrlString(host, path) {
  host = host.trim();
  path = path.trim();
  while (host.endsWith('/') || host.endsWith('\\')) {
      host = host.slice(0, -1);
  }
  while (path.startsWith('/') || path.startsWith('\\')) {
      path = path.slice(1);
  }
  return `${host}/${path}`;
}

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  })

  app.use(vite.middlewares)
  app.use(express.json())

  app.post('/create_payment_url', async function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let ip_request = await fetch('https://api.ipify.org?format=json')
    ip_request = await ip_request.json()
    ipAddr = ip_request.ip
    
    const redirectUrl = new URL(
      resolveUrlString(
        'https://sandbox.vnpayment.vn',
        'paymentv2/vpcpay.html',
      ),
    )
    var returnUrl = `http://localhost:5174/payment-result/${req.body.order_id}`;

    var createDate = moment().format('yyyyMMDDHHmmss');
    var expireDate = moment().add(5, 'minutes').format('yyyyMMDDHHmmss')
    var orderId = moment().format('HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.order_description;
    var orderType = 'other';
    var locale = 'vn';
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = 'JIE9SPF8';
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = expireDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    Object.entries(vnp_Params)
      .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
      .forEach(([key, value]) => {
          // Skip empty value
          if (!value || value === '' || value === undefined || value === null) {
              return;
          }

          redirectUrl.searchParams.append(key, value.toString());
      });

    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", 'OQ3UW407FY3FSB6HA8NEE80IXH7PD6LJ');
    var signed = hmac.update(new Buffer(redirectUrl.search.slice(1).toString(), 'utf-8')).digest("hex");
    redirectUrl.searchParams.append('vnp_SecureHash', signed);

    const vnpUrl = redirectUrl.toString()

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      url: vnpUrl
    }));
  });

  app.get('/*/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

  app.listen(5174, () => console.log(`Server is running at http://localhost:5174`))
}

createServer()
