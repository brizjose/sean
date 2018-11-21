const db = require('../config/database');
const fs = require('fs');
const path = require('path');

module.exports = {
    index(request, response) {
        console.log('from controller = got to index route', request);
        let query = "SELECT * FROM `players` ORDER BY id ASC";
        
        db.query(query, (error, result) => {
            if(error) {
                response.status(500).json(error);
            }
            response.status(200).json(query);
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
                    const query = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" + first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + username + "')";
                    db.query(query, (error, result) => {
                        if (error) {
                            return result.status(500).json(error);
                        }
                        result.status(201).json(result);
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
        const get_image_query = 'SELECT image from `players` WHERE id = "' + player_id + '"';
        const delete_user_query = 'DELETE FROM players WHERE id = "' + player_id + '"';

        db.query(get_image_query, (error, result) => {
            if (error) {
                return response.status(500).json(error);
            }
            
            const image = result[0].image;

            fs.unlink(path.resolve(`src/img/${image_name}`), (error) => {
                if (error) {
                    return response.status(500).json(error);
                }
                db.query(delete_user_query, (error, result) => {
                    if (error) {
                        return response.status(500).json(error);
                    }
                    response.status(200).json(result);
                });
            });
        });
    },
    show(request, response) {
        const get_image_query = 'SELECT image from `players` WHERE id = "' + player_id + '"';
        const player_id = request.params.id;
        const get_player_query = 'SELECT FROM players WHERE id = "' + player_id + '"';

        db.query(get_player_query, (error, result) => {
            if (error) {
                return response.status(500).json(error);
            }
            response.status(200).json(result);
        });

        db.query(get_image_query, (error, image) => {
            if (error) {
                return response.status(500).json(error);
            }
            response.status(200).json(image);
        });
    }
};
