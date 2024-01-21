import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Authenticate({ token }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setUserData(result.data); // Store the user data
      } else {
        throw new Error(result.message || 'Authentication failed');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {userData && <p>Welcome, {userData.username}!</p>} // Display the username
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}

Authenticate.propTypes = {
  token: PropTypes.string
};
