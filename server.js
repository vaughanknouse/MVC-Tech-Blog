// Main server file to run the application

// Required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Database configuration with Sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars view engine with helpers
const hbs = exphbs.create({ helpers });

// Configure session middleware
const sess = {
  secret: 'Super secret secret', // Secret key for signing the session ID cookie
  cookie: {
    maxAge: 60 * 60 * 1000, // Session cookie expiration time (1 hour)
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false, // Set to true if using HTTPS (recommended for production)
    sameSite: 'strict', // Ensures cookies are sent only for same-site requests
  },
  resave: false, // Prevents session from being saved back to the store if unmodified
  saveUninitialized: true, // Forces a session to be saved to the store, even if it's new but not modified
  store: new SequelizeStore({
    db: sequelize, // Use Sequelize store to persist session data
  }),
};

// Apply session middleware to the app
app.use(session(sess));

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes defined in the controllers module
app.use(routes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
