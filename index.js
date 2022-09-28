const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/robots.txt', (req, res) => {
    res.send(`
User-agent: *
Disallow: /
`);
  })
  .get('/svg-script', (req, res) => {
    res.setHeader('content-type', 'image/svg+xml');
    res.send(`<?xml version="1.0" encoding="utf-8"?>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 44 44" style="enable-background:new 0 0 44 44;" xml:space="preserve">
         <script>
            alert('hello');
         </script>
      <g>
        <path d="M29.5,12H14.5c-2.7,0-5,2.3-5,5.1v9.7c0,2.8,2.2,5.1,5,5.1h15.1c2.7,0,5-2.3,5-5.1v-9.7C34.5,14.3,32.3,12,29.5,12z
           M32.5,26.9c0,1.7-1.3,3.1-3,3.1H14.5c-1.6,0-3-1.4-3-3.1v-9.7c0-1.7,1.3-3.1,3-3.1h15.1c1.6,0,3,1.4,3,3.1V26.9z"/>
        <path d="M24.1,21.1c-0.8-0.4-2.1-1.3-2.9-1.8c-0.8-0.5-1.4-0.1-1.4,0.9s0,2.6,0,3.5s0.6,1.3,1.4,0.9c0.7-0.4,2.1-1.3,2.9-1.7
          C24.9,22.4,24.9,21.5,24.1,21.1z"/>
      </g>
      </svg>`
    );
  })
  .get('/redirect/:times', (req, res) => {
    const times = parseInt(req.params.times, 10) || 0;
    if (times > 0) {
      res.redirect('/redirect/' + (times - 1));
    } else {
      res.send('<html><head><title>redirected</title></head><body>redirected</body></html');  
    }
  })
  .get('/timeout', (req, res) => {
     const time = parseInt(req.query.timeout, 10) || 5;
     setTimeout(function () {
        res.send('<html><head><title>' + time + '</title></head><body>' + time + '</body></html');
     }, time);
  })
  .get('/a/b/c/d', (req, res) => {
     res.redirect('../../');
  })
  .get('/alio', (req, res) => {
     res.send([
       '<html>',
       '<head>',
       '<title>' + 'A'.repeat(4000) + '</title>',
       '<meta name="description" content="' + 'B'.repeat(4000) + '" />',
       '</head>',
       '<body>',
       '<div>' + 'C'.repeat(4000) + '</div>',
       '</body>',
       '</html>',
     ].join(''));
  })
 .get('/kuku', (req, res) => {
    const h1 = JSON.stringify(req.headers, null, 2);
    const h2 = JSON.stringify(req.rawHeaders, null, 2);
    res.send('<html><head><title>' + h2 + '</title></head><body><pre>' + h1 + '</pre><hr /><pre>' + h2 + '</pre></body></html>');
  })
  .get('*', (req, res) => {
    const h1 = JSON.stringify(req.headers, null, 2);
    const h2 = JSON.stringify(req.rawHeaders, null, 2);
    res.send('<title>' + h2 + '</title><pre>' + h1 + '</pre><hr /><pre>' + h2 + '</pre>');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
