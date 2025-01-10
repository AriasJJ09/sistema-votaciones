const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Candidate = sequelize.define('Candidate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  party: { type: DataTypes.STRING, allowNull: false },
  votes: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  timestamps: false, // Desactivar columnas createdAt y updatedAt
});

module.exports = Candidate;
