const express = require('express')
const router = express.Router()
const query = require('../functions/DBfunction.js')
const mysqlConnection = require('../DB/connection.js')

router.post('/registerGame', async(req, res) => {

    mysqlConnection.beginTransaction(async (errorT) =>{

        if(errorT){
            console.log(errorT)
            res.send(500)
        }

        const {playerOneName, playerTwoName, gamesWonPlayerOne, gamesWonPlayerTwo} = req.body
        let playerOneId = 0
        let playerTwoId = 0
    
        let playerOne = await query('SELECT id FROM players WHERE player_name = ?;', playerOneName)
            .catch((err) => {
                console.log(err)
                mysqlConnection.rollback()
                if(err) res.status(500)
            })
        if(!playerOne[0]){
            playerOne = await query('INSERT INTO players (player_name) VALUES (?);', playerOneName).catch((err) => {
                console.log(err)
                mysqlConnection.rollback()
                if(err) res.status(500)
            })
            playerOneId = playerOne.insertId
        } else {
            playerOneId = playerOne[0].id
        }
    
        let playerTwo = await query('SELECT id FROM players WHERE player_name = ?;', playerTwoName).catch((err) => {
            console.log(err)
            mysqlConnection.rollback()
            if(err) res.status(500)
        })
        if(!playerTwo[0]){
            playerTwo = await query('INSERT INTO players (player_name) VALUES (?);', playerTwoName).catch((err) => {
                console.log(err)
                mysqlConnection.rollback()
                if(err) res.status(500)
            })
            playerTwoId = playerTwo.insertId
        } else {
            playerTwoId = playerTwo[0].id
        }
    
        const idPlayers = [playerOneId,playerTwoId]
        
        const game = await query('INSERT INTO games (player_one_id, player_two_id) VALUES (?,?);', idPlayers).catch((err) => {
            console.log(err)
            mysqlConnection.rollback()
            if(err) res.status(500)
        })
        
        const winnerPlayerId = gamesWonPlayerOne > gamesWonPlayerTwo ? playerOneId : playerTwoId
        let scoresData = [game.insertId, gamesWonPlayerOne, gamesWonPlayerTwo, winnerPlayerId]

        await query('INSERT INTO scores (game_id, games_won_player_one, games_won_player_two, winner_player_id) VALUES (?,?,?,?)', scoresData)
            .then(()=>{
                mysqlConnection.commit()
                res.send(200)
            })
            .catch((err) => {
                res.send(500)
                console.log(err)
                mysqlConnection.rollback()
            })
    })
})

module.exports = router