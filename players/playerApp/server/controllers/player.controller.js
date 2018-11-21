const db = require('../config/database');
const fs = require('fs');
const path = require('path');

module.exports = {
    index(request, response) {
        console.log('from controller = got to index route');
        let query = "SELECT * FROM `players`";
        
        db.query(query, (error, data) => {
            if(error) {
                console.log(error);
                response.status(500).json(error);
            }
            console.log(data);
            response.status(200).json(data);
        });
    },
    create(request,response) {
        console.log('got to controller/create with this request:', request.body);

        const first_name = request.body.first_name;
        const last_name = request.body.last_name;
        const position = request.body.position;
        const number = request.body.number;
        const username = request.body.username;

        const username_query = "SELECT * FROM `players` WHERE user_name = '" + username + "'"; 

        db.query(username_query, (error, result) => {
            if (error) {
                return result.status(500).json(error);
            }
            if (result.length > 0) {
                response.status(406).json("Username already exists");
            } else {
                // send the player'sdetails to the database 
                const query = "INSERT INTO `players` (first_name, last_name, position, number, user_name) VALUES ('" + first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + username + "')";
                db.query(query, (error, result) => {
                    if (error) {
                        return response.status(500).json(error);
                    }
                    response.status(201).json(result);
                });
            };
        });
    },
    update(request, response) {
        const player_id = request.params.id;
        const first_name = request.body.first_name;
        const last_name = request.body.last_name;
        const position = request.body.position;
        const number = request.body.number;

        const query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + player_id + "'";
        db.query(query, (error, result) => {
            if (error) {
                return response.status(500).json(error);
            }
            response.status(202).json(result);
        }); 
    },
    destroy(request, response) {
        const player_id = request.params.id;
        const delete_user_query = 'DELETE FROM players WHERE id = "' + player_id + '"';
        db.query(delete_user_query, (error, result) => {
            if (error) {
                return response.status(500).json(error);
            }
            response.status(200).json(result);
        });
    },
    show(request, response) {
        const player_id = request.params.id;
        const get_player_query = 'SELECT FROM players WHERE id = "' + player_id + '"';
        
        db.query(get_player_query, (error, result) => {
            if (error) {
                return response.status(500).json(error);
            }
            response.status(200).json(result);
        });
    }
};
