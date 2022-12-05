const express = require('express')
const app = express()
const port = 3000

console.clear()

app.use(express.json())
app.use('/api', require('./src/routes/RegisterGame.js'))
app.use('/api', require('./src/routes/getTopPlayers.js'))
app.use('/api', require('./src/routes/gamesHistory.js'))
app.use('/api', require('./src/routes/InterestingData.js'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))

module.exports =  app