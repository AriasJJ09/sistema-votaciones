const express = require('express');
const { 
  createVote, 
  getAllVotes, 
  getStatistics 
} = require('../controllers/voteController');

const router = express.Router();

router.post('/', createVote);
router.get('/', getAllVotes);
router.get('/statistics', getStatistics);

module.exports = router;
