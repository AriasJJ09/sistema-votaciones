const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Voter = sequelize.define('Voter', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  has_voted: { type: DataTypes.BOOLEAN, defaultValue: false },
},{
  timestamps: false, // Desactiva las columnas createdAt y updatedAt

});

module.exports = Voter;