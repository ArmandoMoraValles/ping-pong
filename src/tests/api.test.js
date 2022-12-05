/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../index.js')

describe('Test all GET routes', () =>{
    it('responds with json', () =>{
        return request(app)
            .get('/api/gamesHistory')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(response => {
                if(Object.keys(response.body[0]).length !== 6) throw new Error('Expected json must have 6 keys')
            })
            .expect(200)
    })

    it('responds with json', () =>{
        return request(app)
            .get('/api/interestingData')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(response => {
                if(Object.keys(response.body).length !== 5) throw new Error('Expected json must have 5 keys')
            })
            .expect(200)
    })

    it('responds with json', () =>{
        return request(app)
            .get('/api/getTopPlayers')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {
                if(response.body.length !==  3) throw Error('Expected 3 objects in the array')
            })
            .expect(200)
    })
})

describe('Test registerGame', () =>{

    it('It response with 201 created', () =>{
        const data = {
            'playerOneName': 'player1',
            'playerTwoName': 'player2',
            'gamesWonPlayerOne': 10,
            'gamesWonPlayerTwo': 9
        }
        return request(app)
            .post('/api/registerGame')
            .send(data)
            .expect(201)
    })

})