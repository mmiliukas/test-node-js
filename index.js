const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
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
  .get('*', (req, res) => {
    const h1 = JSON.stringify(req.headers, null, 2);
    const h2 = JSON.stringify(req.rawHeaders, null, 2);
    res.send('<title>' + h2 + '</title><pre>' + h1 + '</pre><hr /><pre>' + h2 + '</pre>');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
