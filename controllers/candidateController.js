const { Op } = require('sequelize');
const Candidate = require('../models/candidate');

const createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ 
        error: 'Error al registrar el candidato.', 
        details: error.message,
        stack: error.stack });
  }
};

const getAllCandidates = async (req, res) => {
    try {
      const { party } = req.query; 
  
      const whereClause = party ? { party: { [Op.like]: `%${party}%` } } : {};
  
      const candidates = await Candidate.findAll({
        where: whereClause,
      });
  
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los candidatos.' });
    }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (candidate) {
      res.json(candidate);
    } else {
      res.status(404).json({ error: 'Candidato no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el candidato.' });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const result = await Candidate.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Candidato no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el candidato.' });
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  deleteCandidate,
};
