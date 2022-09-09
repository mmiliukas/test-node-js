const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('*', (req, res) => {
    const h1 = JSON.stringify(req.headers);
    const h2 = JSON.stringify(req.rawHeaders);
    res.send('<pre>' + h1 + '</pre><pre>' + h2 + '</pre>');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
