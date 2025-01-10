const Voter = require('../models/voter');
const Candidate = require('../models/candidate');
const Vote = require('../models/vote');

const createVote = async (req, res) => {
    const { voter_id, candidate_id } = req.body;
  
    try {
      const voter = await Voter.findByPk(voter_id);
      if (!voter) return res.status(404).json({ error: 'Votante no encontrado.' });
  
      if (voter.has_voted) return res.status(400).json({ error: 'El votante ya emitió su voto.' });
  
      // Verificar si el votante es también un candidato
      const candidateAsVoter = await Candidate.findByPk(voter_id);
      if (candidateAsVoter) return res.status(400).json({ error: 'Un votante no puede ser un candidato.' });
  
      const candidate = await Candidate.findByPk(candidate_id);
      if (!candidate) return res.status(404).json({ error: 'Candidato no encontrado.' });
  
      const voterAsCandidate = await Voter.findByPk(candidate_id);
      if (voterAsCandidate) return res.status(400).json({ error: 'Un candidato no puede ser un votante.' });
  
      await Vote.create({ voter_id, candidate_id });
  
      voter.has_voted = true;
      await voter.save();
  
      candidate.votes += 1;
      await candidate.save();
  
      res.status(201).json({ message: 'Voto registrado exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el voto.' });
    }
  };

const getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.findAll();
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los votos.' });
  }
};

const getStatistics = async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    const votersWhoVoted = await Voter.count({ where: { has_voted: true } });
    const totalVoters = await Voter.count();

    const statistics = candidates.map(candidate => ({
      candidato: candidate.name,
      totalVotos: candidate.votes,
      porcentaje: ((candidate.votes / votersWhoVoted) * 100).toFixed(2) + '%',
    }));

    res.json({
      statistics,
      totalVotantesQueVotaron: votersWhoVoted,
      totalVotantes: totalVoters,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas.' });
  }
};

module.exports = {
  createVote,
  getAllVotes,
  getStatistics,
};
