const http = require('http');
const https = require('https');

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', async () => {
    const dnsQuery = Buffer.concat(body);

    /** @type {https.RequestOptions} */
    const options = {
      hostname: 'dns.google',
      path: '/dns-query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/dns-message',
        'Content-Length': dnsQuery.length
      }
    };

    const dohReq = https.request(options, dohRes => {
      let responseChunks = [];

      dohRes.on('data', chunk => responseChunks.push(chunk));
      dohRes.on('end', () => {
        const response = Buffer.concat(responseChunks);
        res.writeHead(200, { 'Content-Type': 'application/dns-message' });
        res.end(response);
      });
    });

    dohReq.on('error', err => {
      console.error('DoH request failed:', err.message);
      res.writeHead(502);
      res.end('Bad Gateway');
    });

    dohReq.write(dnsQuery);
    dohReq.end();
  });
})

const PORT = parseInt(process.env.PORT ?? 8053, 10);

server.listen(PORT, () => {
  console.log(`DoH server listening on http://localhost:${PORT}/dns-query`);
});
