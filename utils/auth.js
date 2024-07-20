// Authentication middleware to send the user to the login page if not logged in

// Middleware function to protect routes that require authentication
const withAuth = (req, res, next) => {
  // Check if the user is logged in by verifying the session's logged_in property
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect the request to the login route (and the user to the login page)
    res.redirect('/login');
  } else {
    // If logged in, proceed to the next middleware or route handler
    next();
  }
};

// Export the middleware function to be used in other parts of the application
module.exports = withAuth;
