import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:7237/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: name, // Match the field name from the server-side model
          UserEmail: email, // Match the field name from the server-side model
          Password: password, // Match the field name from the server-side model
          Phone: phone, // Match the field name from the server-side model
        }),
      });

      if (response.ok) {
        console.log('Signup successful');
        // Redirect or perform other actions after successful signup
        window.location.href = '/login';
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Handle signup errors
    }
  };

  return (
    <>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full ms-4 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            id="name"
            placeholder="Your Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="mb-3">
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full ms-4 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            id="phone"
            placeholder="Your Phone Number"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
