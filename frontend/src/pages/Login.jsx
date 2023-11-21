import React, { useState } from 'react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = 'https://localhost:7237/api/users/login';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          useremail: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User authenticated:', data);
        // Redirect to the studentlist page upon successful login
        window.location.href = '/studentlist';
      } else if (response.status === 401) {
        console.log('Invalid credentials');
        // Handle invalid credentials
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle other errors
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full ms-4 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            id="email"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full ms-4 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            id="password"
            placeholder="Your Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <a className="m-4 font text-decoration-none" href="./signup">
          Signup
        </a>
      </form>
    </>
  );
};

export default Login;
