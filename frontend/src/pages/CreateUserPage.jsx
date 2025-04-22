import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
import { FaUserPlus, FaComments, FaUserCircle, FaUserCheck } from "react-icons/fa";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const CreateUserPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const submission = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        `${BASE_URL}/api/users/auth/signup`, // full endpoint path
        {
          username,
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
            
      console.log('User created: ', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  };

  // Use theme values for light/dark mode:
  const pageBg = useColorModeValue('gray.100', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      minH="100vh"
      bg={pageBg}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg={cardBg} p={8} borderRadius="md" boxShadow="lg" width="sm">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Create an Account
        </Heading>
        <form onSubmit={submission}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="yellow" width="full">
              Create Account
            </Button>
            <Link to={'/login'}> 
                <Button type = "submit" color Scheme ="gray" width="full" gap="2">
                Log in
                <FaUserCheck />
                </Button>  
            </Link>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateUserPage;
