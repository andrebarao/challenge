const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10); // Hash the password before saving
      this.setDataValue('password', hashedPassword);
    },
  },
});

// Validate the password
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// models/File.js
const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
//User.hasMany(File);
//File.belongsTo(User);

module.exports = { User, File };