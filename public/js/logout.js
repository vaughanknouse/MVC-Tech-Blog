// Function to handle user logout
const logout = async () => {
  try {
    // Send a GET request to the /api/users/logout endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response status indicates success
    if (response.ok) {
      alert('You have been logged out. Redirecting to the login page...');
      // Redirect the user to the login page upon successful logout
      document.location.replace('/login');
    } else {
      // Alert the user if there was an error during logout
      alert(response.statusText);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

// Add an event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);

// Variable to hold the timer ID
let timeout;

// Function to reset the inactivity timer
const resetTimer = () => {
  // Clear the existing timer to prevent premature logout
  clearTimeout(timeout);

  // After 30 minutes (in milliseconds), the logout function will be called
  timeout = setTimeout(logout, 30 * 60 * 1000);
};

// Add event listeners to detect user activity
// Reset the inactivity timer when mouse movement is detected
document.addEventListener('mousemove', resetTimer);

// Reset the inactivity timer when any key is pressed
document.addEventListener('keydown', resetTimer);

// Initialize the timer when the page loads
resetTimer();
