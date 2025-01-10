const express = require('express');
const { 
  createCandidate, 
  getAllCandidates,
  getCandidateById, 
  deleteCandidate 
} = require('../controllers/candidateController');

const router = express.Router();

router.post('/', createCandidate);
router.get('/', getAllCandidates);
router.get('/:id', getCandidateById);
router.delete('/:id', deleteCandidate);

module.exports = router;
