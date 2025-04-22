import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:5173';  // Or use the environment variable if needed
import {
  Textarea,
  Button,
  useToast
} from '@chakra-ui/react';

import { Box, Heading, Text } from '@chakra-ui/react';

const Profile = () => {
  const [user, setUser] = useState(null);  // To store user data
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);  // To store any error that occurs
  const token = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setUser(response.data);  // Store the user data
        setBio(response.data.bio || '');
      } catch (error) {
        console.error("Error fetching profile: ", error);
        setError('Failed to fetch profile');  // Handle errors
      }
    };

    if (token) {
      fetchUserProfile();  // Fetch the user profile if a token exists
    }
  }, [token]);

  const saveBio = async () => {
    try {
      await axios.put(`${BASE_URL}/api/users/profile/bio`, 
        { bio }, 
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );      
      setUser(prev => ({ ...prev, bio }));
      setEditing(false);
      toast({ title: "Bio updated!", status: "success", duration: 3000 });
    } catch (err) {
      console.error("Failed to update bio", err);
      toast({ title: "Failed to update bio", status: "error", duration: 3000 });
    }
  };

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

      <Box mt={5}>
        <Heading size="md">Bio</Heading>
        {editing ? (
          <>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            <Button mt={2} onClick={saveBio} colorScheme="blue">Save</Button>
          </>
        ) : (
          <>
            <Text mt={2}>{user.bio || "No bio yet."}</Text>
            <Button mt={2} onClick={() => setEditing(true)} colorScheme="teal">Edit Bio</Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
