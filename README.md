<h1>Ping-Pong</h1>
<h2>How to run</h2>

<h3>Setting up the database in your local environment</h3>
<p>Is necessary to have a MySql database on the localhost. The next step is execute the queries for the creation of the database and the tables, you can find them in the file named "database.sql". This step is very simple if you use xampp to run MySQL service</p>

<h3>Clone the repo</h3>
<p>First, clone this repository on your own computer using the git clone command</p>  

<p>Practically  the database connection will already be configured by default in the repository, you can see it in the file src>DB>connection.js.
Normally this file is in the .gitignore but to speed up the tests it has been left in the repository. </p>
  
<h3>Execute npm install</h3>
<p>To load all the necessary NPM packages, just open a terminal in the project folder and run the command "npm install".</p>

<h3>Test the project</h3>
<p>In the project you will find the necessary tests to check the operation of all endpoints. Just type the command "npm test" in your terminal (make sure that the terminal is in your project folder).</p>
<p>You can also run 'nodemon index.js' command to open the backend server. The following urls will be available in the project</p>
<ul>
  <h2>Get routes</h2>
  <li>http://localhost:3000/api/getTopPlayers</li>
    <p>Get top 3 players of all office</p>
  <li>http://localhost:3000/api/gamesHistory</li>
    <p>Get a history of all played games</p>
  <li>http://localhost:3000/api/interestingData</li>
  <p>Get interesting data about all the games played</p>
  </ul>
  
  <ul>
    <h2>post route</h2>
    <li>http://localhost:3000/api/registerGame</li>
    <p>This route expects a json input parameter like the one show below</p>
    <p>{<br>
      <t>"playerOneName": "Armando",<br>
      "playerTwoName": "Luis",<br>
      "gamesWonPlayerOne": 10,<br>
      "gamesWonPlayerTwo": 8<br>
    }<br></p>
    <p>This route will register a new game and new players (in the case of new players) and set the wins and the general winer of a match</p>
  </ul>
