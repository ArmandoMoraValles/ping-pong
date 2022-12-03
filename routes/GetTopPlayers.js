const express = require('express')
const router = express.Router()
const query = require('../functions/DBfunction.js')

router.get('/GetTopPlayers', async(req,res)=>{
    
    const idTopPlayers = []
    const topPlayers = []

    let sql = `SELECT winner_player_id AS id, 
        count(winner_player_id) AS num_of_wins 
        FROM scores
        GROUP BY winner_player_id
        ORDER BY num_of_wins DESC LIMIT 3;`

    const data = await query(sql)
    data.forEach(element => idTopPlayers.push(element.id))
    
    sql = `SELECT p.player_name, 
            count(s.winner_player_id) AS total_wins
            FROM players p
            LEFT JOIN scores s 
                ON s.winner_player_id = p.id
            WHERE p.id IN (?,?,?)
            GROUP BY p.player_name;`

    const playersName = await query(sql, idTopPlayers)     

    playersName.forEach(element => {
        topPlayers.push({
            'playerName': element.player_name, 
            'totalWins': element.total_wins
        })
    })

    res.json(playersName).sendStatus(200)
})

module.exports = router