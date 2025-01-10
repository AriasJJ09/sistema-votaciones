const express = require('express');
const { createVoter, getAllVoters, getVoterById, deleteVoter } = require('../controllers/voterController');
const router = express.Router();

router.post('/', createVoter);
router.get('/', getAllVoters);
router.get('/:id', getVoterById);
router.delete('/:id', deleteVoter);

module.exports = router;
