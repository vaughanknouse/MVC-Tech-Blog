// Function to handle the registration form submission
const registerFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get and trim the values from the registration form inputs
  const passwordInput = document
    .querySelector('#password-register')
    .value.trim();
  const usernameInput = document
    .querySelector('#username-register')
    .value.trim();

  // Check if all required fields are filled
  if (passwordInput && usernameInput) {
    try {
      // Send a POST request to the /api/users/register endpoint with the registration data
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          password: passwordInput,
          username: usernameInput,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the response status indicates success
      if (response.ok) {
        // Alert the user of successful registration
        alert('Registration successful! Redirecting to login...');
        // Redirect to the login page upon successful registration
        document.location.replace('/login');
      } else {
        // Alert the user if registration fails
        alert('Sign Up failed');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error during registration:', error);
    }
  } else {
    // Alert the user if any required fields are missing
    alert('Please fill in all fields');
  }
};

// Add an event listener to the "Sign Up" button
// Call the registerFormHandler function when the button is clicked
document
  .querySelector('.register-btn')
  .addEventListener('click', registerFormHandler);
