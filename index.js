const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('*', (req, res) => {
    const h1 = JSON.stringify(req.headers, null, 2);
    const h2 = JSON.stringify(req.rawHeaders, null, 2);
    res.send('<title>' + h2 + '</title><pre>' + h1 + '</pre><hr /><pre>' + h2 + '</pre>');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
