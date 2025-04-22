import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:5173';  // Or use the environment variable if needed

import { Box, Heading, Text } from '@chakra-ui/react';

const Profile = () => {
  const [user, setUser] = useState(null);  // To store user data
  const [error, setError] = useState(null);  // To store any error that occurs
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setUser(response.data);  // Store the user data
      } catch (error) {
        console.error("Error fetching profile: ", error);
        setError('Failed to fetch profile');  // Handle errors
      }
    };

    if (token) {
      fetchUserProfile();  // Fetch the user profile if a token exists
    }
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={5} boxShadow="lg" borderRadius="md">
      <Heading as="h1" size="lg">User Profile</Heading>
      <Text mt={4}><strong>Username:</strong> {user.username}</Text>
      <Text><strong>Email:</strong> {user.email}</Text>
      {/* Render more user data as needed */}
    </Box>
  );
};

export default Profile;
