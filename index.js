const express = require('express')
const app = express()
const port = 3000

console.clear()

app.use(express.json())
app.use('/api', require('./routes/registerGame.js'))
app.use('/api', require('./routes/getTopPlayers.js'))
app.get('/', (req,res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))