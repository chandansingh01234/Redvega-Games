const https = require('https');

const postData = JSON.stringify({
  email: 'redvegagames@gmail.com'
});

const options = {
  hostname: 'api.web3forms.com',
  port: 443,
  path: '/create-key',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Web3Forms Key API Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(postData);
req.end();
