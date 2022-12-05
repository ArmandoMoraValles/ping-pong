CREATE DATABASE ping_pong;

USE ping_pong;

CREATE TABLE players (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    player_name varchar(70) NOT NULL UNIQUE,
    date_of_registration datetime NOT NULL DEFAULT NOW()
);

CREATE TABLE games (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	player_one_id int NOT NULL,
    player_two_id int NOT NULL,
    game_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (player_one_id) REFERENCES players(id),
    FOREIGN KEY (player_two_id) REFERENCES players(id)
);

CREATE TABLE scores (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    game_id int NOT NULL, 
    winner_player_id int,
    wins_player_one int NOT NULL,
    wins_player_two int NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (winner_player_id) REFERENCES players(id)
);

INSERT INTO players (player_name) VALUES ("Armando");
INSERT INTO players (player_name) VALUES ("Armando2");
INSERT INTO players (player_name) VALUES ("Armando3");

INSERT INTO games (player_one_id, player_two_id) VALUES (1,2);
INSERT INTO games (player_one_id, player_two_id) VALUES (2,3);
INSERT INTO games (player_one_id, player_two_id) VALUES (2,3);

INSERT INTO scores (game_id, wins_player_one, wins_player_two, winner_player_id) VALUES (1,8,2,1);
INSERT INTO scores (game_id, wins_player_one, wins_player_two, winner_player_id) VALUES (2,10,12,3);
INSERT INTO scores (game_id, wins_player_one, wins_player_two, winner_player_id) VALUES (2,13,12,2);