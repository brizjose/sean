const { player_controller } = require('../../controllers');

const router = require('express').Router();

module.exports = router
.get('/', player_controller.index)
.post('/', player_controller.create)
.get('/:id', player_controller.show)
.put('/:id/edit', player_controller.update)
.delete(':id/delete', player_controller.destroy)