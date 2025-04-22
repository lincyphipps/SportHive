import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5173';  // Or use the environment variable if needed
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Text,
    Heading,
    useColorModeValue,
    Spacer,
  } from '@chakra-ui/react';

const Profile = () => {
  const [user, setUser] = useState(null);  // To store user data
  const [error, setError] = useState(null);  // To store any error that occurs
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/posts/getposts`);
            const userPosts = response.data.filter(post => post.author._id === user._id);
            setPosts(userPosts);
        }catch(error){
            console.error("Error fetching posts: ", error);
        }
    };
    if (user){
        fetchUserPosts()
    }
  }, [user]);
  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  const pageBg = useColorModeValue('gray.100', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <VStack spacing={6} p={8} bg={pageBg} minH="100vh">
      {/* User Info */}
      <Box bg={cardBg} p={8} borderRadius="md" boxShadow="lg" w="100%" maxW="600px">
        <Heading as="h1" size="lg">User Profile</Heading>
        <Text mt={4}><strong>Username:</strong> {user.username}</Text>
        <Text><strong>Email:</strong> {user.email}</Text>
      </Box>

      {/* Posts Section */}
      <Box bg={cardBg} p={8} borderRadius="md" boxShadow="lg" w="100%" maxW="600px">
        <Heading size="md" mb={4}>{user.username}'s Posts</Heading>
        {user.posts.length === 0 ? (
          <Text>No posts yet.</Text>
        ) : (
          posts.map((post) => (
            <Box key={post._id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
              <Text><strong>Content:</strong> {post.text}</Text>
              <Text fontsize="sm" color="gray.500" mt={1}>Posted on {new Date(post.createdAt).toLocaleString()}</Text>
            </Box>
          ))
        )}
      </Box>

      {/* Communities Section */}
      <Box bg={cardBg} p={8} borderRadius="md" boxShadow="lg" w="100%" maxW="600px">
        <Heading size="md" mb={4}>{user.username}'s Communities</Heading>
        {user.communities.length === 0 ? (
          <Text>No communities joined yet.</Text>
        ) : (
          user.communities.map((community) => (
            <Box key={community._id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
              <Text><strong>Sport:</strong> {community.sport}</Text>
              <Text><strong>Team:</strong> {community.team || "N/A"}</Text>
              <Text><strong>Privacy:</strong> {community.privacy}</Text>
              <Text><strong>Zip Code:</strong> {community.zip}</Text>
              <Text><strong>Members:</strong> {community.numMembers || 0}</Text>
            </Box>
          ))
        )}
      </Box>
    </VStack>
  );
};
export default Profile;
