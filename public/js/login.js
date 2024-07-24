const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  // Retrieve and trim the username and password values from the input fields
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both username and password fields are not empty
  if (username && password) {
    // Send a POST request to the server with the username and password
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response from the server is OK (status code 200-299)
    if (response.ok) {
      // Alert user of successful login
      alert('Login successful!');
      // Redirect to the home page upon successful login
      document.location.replace('/');
      console.log('logged in');
    } else {
      // Show an alert message if the login attempt was unsuccessful
      alert('Incorrect username or password. Please try again!');
    }
  }
};
