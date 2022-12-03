const express = require('express')
const router = express.Router()
const query = require('../functions/DBfunction.js')

router.get('/interestingData', async(re,res)=>{

    const sql = `SELECT count(*) AS 'totalGames', 
    (SELECT count(*) FROM players) AS 'totalPlayers',
    (SELECT sum(wins_player_one) + sum(wins_player_two) FROM scores) AS 'totalWins',
    (SELECT max(game_date) FROM games) AS 'lastGameAt',
    (SELECT min(game_date) FROM games) as 'firstGameAt'    
    FROM games;`

    const interestingData = await query(sql)
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
    if(res.headersSent) return


    res.json(interestingData[0])
})

module.exports = router