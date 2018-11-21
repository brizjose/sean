const player_router = require('./player.routes');

const router = require('express').Router();

module.exports = router
  .use('/players', player_router)