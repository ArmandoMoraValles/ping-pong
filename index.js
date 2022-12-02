const express = require('express')
const app = express()
const port = 3000

console.clear()

app.get('/', (req,res) => res.send('Hello World!'))

app.use('/api', require('./routes/firstExample.js'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))