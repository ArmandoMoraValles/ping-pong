const express = require('express')
const router = express.Router()
const query = require('../functions/DBfunction.js')

router.get('/hello', async(req, res) => {
    const result = await query('SELECT * FROM scores')
    res.send('Peticion a la BD' + result)
})

module.exports = router