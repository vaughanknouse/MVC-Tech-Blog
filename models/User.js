// User model file to store and manage user information

// Import Sequelize Model and DataTypes
const { Model, DataTypes } = require('sequelize');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
// Import Sequelize database connection instance
const sequelize = require('../config/connection');

// Create User model
class User extends Model {
  // Method to check the password on login
  checkPassword(loginPw) {
    // Compare the provided password with the hashed password stored in the database
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Create fields/columns for User model and initialize the User model
User.init(
  {
    // Define model's columns
    id: {
      type: DataTypes.INTEGER, // Integer data type for the id
      allowNull: false, // This field cannot be null
      primaryKey: true, // This field is the primary key
      autoIncrement: true, // This field auto-increments
    },
    username: {
      type: DataTypes.STRING, // String data type for the username
      unique: true, // This field must be unique (prevents duplicate usernames in database)
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING, // String data type for the password
      allowNull: false,
      validate: {
        len: [8], // Validate that the password is at least 8 characters long
      },
    },
  },
  {
    // Hooks are used so that if a user is created or updated, the password is encrypted before being stored in the database.
    hooks: {
      // Before a new user is created, hash the password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before an existing user is updated, hash the password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Define model options
    sequelize, // Pass the sequelize instance
    timestamps: false, // Disable automatic createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    underscored: true, // Use snake_case (spaces replaced with underscores) for column names
    modelName: 'user', // Define the model name
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
