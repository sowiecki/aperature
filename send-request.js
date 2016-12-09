const http = require('http');

const sendRequest = (options, body) => {
  const request = http.request(options, (response) => {
    response.setEncoding('utf8');

    response.on('data', (data) => {
      const { status } = JSON.parse(data);

      console.log(`Request status ${status}`);
    });
  });

  request.on('error', ({ message }) => {
    console.log(`Problem with request: ${message}`);
  });

  if (body) {
    request.write(JSON.stringify(body));
  }

  request.end();
};

module.exports = sendRequest;