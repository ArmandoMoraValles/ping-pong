const express = require('express')
const router = express.Router()
const query = require('../DB/functions.js')

router.get('/GamesHistory', async(req,res)=> {
    
    let sql = `SELECT p.player_name AS 'playerOneName',
	            s.wins_player_one AS 'winsPlayerOne',
	            p2.player_name AS 'playerTwoName', 
	            s.wins_player_two AS 'winsPlayerTwo',
                pwiner.player_name AS 'playerName',
                g.game_date AS 'gameDate'
                FROM games g
                LEFT JOIN players p
                    ON p.id = g.player_one_id
                LEFT JOIN players p2
                    ON p2.id = g.player_two_id
                LEFT JOIN scores s
                    ON s.game_id = g.id
                LEFT JOIN players pwiner
                    ON s.winner_player_id = pwiner.id;`

    const gamesHistory = await query(sql)
        .catch((err) => {
            if(err) console.log(err)
            res.sendStatus(500)
        })
    if(res.headersSent) return    

    res.json(gamesHistory)
})

module.exports = router
