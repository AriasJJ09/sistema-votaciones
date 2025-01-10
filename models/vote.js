const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Voter = require('./voter');
const Candidate = require('./candidate');

const Vote = sequelize.define('Vote', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  voter_id: { 
    type: DataTypes.INTEGER,
    references: { model: Voter, key: 'id' },
    allowNull: false,
  },
  candidate_id: { 
    type: DataTypes.INTEGER,
    references: { model: Candidate, key: 'id' },
    allowNull: false,
  },
}, {
  timestamps: false, // Desactivar columnas createdAt y updatedAt
});

module.exports = Vote;
