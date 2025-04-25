import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;  // Or use the environment variable if needed
import {
    Textarea,
    useToast,
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
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);  // To store any error that occurs
  const token = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: {'Authorization': `Bearer ${token}`}
        });
        setUser(response.data);  // Store the user data
        setBio(response.data.bio || '');
      } catch (error) {
        console.error("Error fetching profile: ", error);
        setError('Failed to fetch profile');  // Handle errors
      }
    };
    if(token){
        fetchUserProfile(); 
        console.log("Profile is getting fetched")
    }
}, [token]);
      

  useEffect(() => {
    const fetchUserPosts = async () => {
        try {
            if (user && user._id){
            console.log("This is loading");
            //if (!user || !user._id) return;
            const response = await axios.get(`${BASE_URL}/api/posts/getposts`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            const userPosts = response.data.filter(post => post.author._id.toString() === user._id.toString());
            console.log("posts: ", userPosts)
            setPosts(userPosts);
        }
        }catch(error){
            console.error("Error fetching posts: ", error);
            //console.log(token);
        }
    };
    if (user){
        fetchUserPosts(); //fetched posts once user profile data is available
        console.log("Posts are getting fetched");
    }
    
  }, [user]);
  
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
    return <div>{error}</div>; //if there is an error show on site
  }

  if (!user) {
    return <div>Loading...</div>; // loading screen for no data in user profile
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

      {/* Posts Section */}
      <Box bg={cardBg} p={8} borderRadius="md" boxShadow="lg" w="100%" maxW="600px">
        <Heading size="md" mb={4}>{user.username}'s Posts</Heading>
        {posts.length === 0 ? (
          <Text>No posts yet.</Text>
        ) : (
          posts.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).map((post) => (
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
        {!user.communities || user.communities.length === 0 ? (
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
