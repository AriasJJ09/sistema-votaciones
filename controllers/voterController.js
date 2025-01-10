const Voter = require('../models/voter');

const createVoter = async (req, res) => {
  try {
    const voter = await Voter.create(req.body);
    res.status(201).json(voter);
  } catch (error) {
    res.status(500).json({ 
        error: 'Error al registrar el votante.',
    });
    
  }
};

const getAllVoters = async (req, res) => {
  try {
    const { page = 1, limit = 10, has_voted } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    if (has_voted !== undefined) {
      where.has_voted = has_voted === 'true';
    }

    const voters = await Voter.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      voters: voters.rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los votantes.' });
  }
};


const getVoterById = async (req, res) => {
  try {
    const voter = await Voter.findByPk(req.params.id);
    if (voter) {
      res.json(voter);
    } else {
      res.status(404).json({ error: 'Votante no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el votante.' });
  }
};

const deleteVoter = async (req, res) => {
  try {
    const result = await Voter.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Votante no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el votante.' });
  }
};

module.exports = {
  createVoter,
  getAllVoters,
  getVoterById,
  deleteVoter,
};
