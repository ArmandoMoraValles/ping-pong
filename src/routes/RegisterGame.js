const express = require('express')
const router = express.Router()
const query = require('../DB/functions.js')
const mysqlConnection = require('../DB/connection.js')

router.post('/registerGame', async(req, res) => {

    const {playerOneName, playerTwoName, gamesWonPlayerOne, gamesWonPlayerTwo} = req.body
        
    let playerOneId = 0
    let playerTwoId = 0

    mysqlConnection.beginTransaction(async (errorT) =>{

        if(errorT){
            console.log(errorT)
            res.sendStatus(500)
        }
        if(res.headersSent) return

        let playerOne = await query('SELECT id FROM players WHERE player_name = ?;', playerOneName)
            .catch((err) => {
                mysqlConnection.rollback()
                console.log(err)
                res.sendStatus(500)
            })
        if(res.headersSent) return

        if(!playerOne[0]){

            playerOne = await query('INSERT INTO players (player_name) VALUES (?);', playerOneName)
                .catch((err) => {
                    mysqlConnection.rollback()
                    console.log(err)
                    res.sendStatus(500)
                })
            if(res.headersSent) return

            playerOneId = playerOne.insertId
        } else playerOneId = playerOne[0].id
        
    
        let playerTwo = await query('SELECT id FROM players WHERE player_name = ?;', playerTwoName)
            .catch((err) => {
                mysqlConnection.rollback()
                console.log(err)
                res.sendStatus(500)
            })
        if(res.headersSent) return

        if(!playerTwo[0]){
            
            playerTwo = await query('INSERT INTO players (player_name) VALUES (?);', playerTwoName)
                .catch((err) => {
                    mysqlConnection.rollback()
                    console.log(err)
                    res.sendStatus(500)
                })
            if(res.headersSent) return

            playerTwoId = playerTwo.insertId
        } else playerTwoId = playerTwo[0].id
        
        const idPlayers = [playerOneId,playerTwoId]
        
        const game = await query('INSERT INTO games (player_one_id, player_two_id) VALUES (?,?);', idPlayers)
            .catch((err) => {
                mysqlConnection.rollback()
                console.log(err)
                res.sendStatus(500)
            })
        if(res.headersSent) return
        
        const winnerPlayerId = gamesWonPlayerOne > gamesWonPlayerTwo ? playerOneId : playerTwoId

        let scoresData = [game.insertId, gamesWonPlayerOne, gamesWonPlayerTwo, winnerPlayerId]

        await query('INSERT INTO scores (game_id, wins_player_one, wins_player_two, winner_player_id) VALUES (?,?,?,?)', scoresData)
            .then(()=>{
                mysqlConnection.commit()
                res.sendStatus(200)
            })
            .catch((err) => {
                mysqlConnection.rollback()
                console.log(err)
                res.sendStatus(500)
            })
    })
})

module.exports = router