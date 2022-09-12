const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
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
