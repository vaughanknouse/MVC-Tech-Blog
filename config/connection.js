// Import Sequelize for ORM
const Sequelize = require('sequelize');
// Import dotenv to load environment variables from .env to the process.env object
require('dotenv').config();

// Initialize a variable to hold the Sequelize instance
let sequelize;

// Check if the DATABASE URL (DB_URL) is provided in the environment variables
if (process.env.DB_URL) {
  // If DB_URL is defined, use it to configure Sequelize
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  // If DB_URL is not defined, then it determines you are on your local machine and utilizes the environment variables from .env to set up Sequelize
  sequelize = new Sequelize(
    process.env.DB_NAME, // The name of the database
    process.env.DB_USER, // The username for the database
    process.env.DB_PW, // The password for the database
    {
      host: 'localhost', // The host of the database server (defaulting to localhost)
      dialect: 'postgres', // The type of database being used (PostgreSQL in this case)
    }
  );
}

// Export the Sequelize instance so it can be used in other parts of the application
module.exports = sequelize;
