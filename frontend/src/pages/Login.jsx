import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:5173';
//const BASE_URL = import.meta.env.VITE_API_URL;

import { FaUserPlus} from "react-icons/fa";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

 const submission = async (e) => {
    e.preventDefault();
    //const token = localStorage.setItem("token", response.data.token)
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/auth/login`,
        { username, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true}
      );
      console.log('User Successfully logged in: ', response.data);
      if (response.status === 200){
          setIsLoggedIn(true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user))
          navigate('/');
      }
    } catch (error) {
        console.error('Error logging user in: ', error);
        toast({
          title: "Error",
          description: "There was an issue logging in",
          status: "error",
          duration: 5000,
          isClosable: true,
      });
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
          Log In
        </Heading>
        <form onSubmit={submission}>
          <VStack spacing={4} align="stretch">
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
              Log In
            </Button>
             
             <Link to={'/create'}> 
                <Button colorScheme ="gray" width="full" gap="2">
                Create Account
                <FaUserPlus />
                </Button>  
            </Link>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
