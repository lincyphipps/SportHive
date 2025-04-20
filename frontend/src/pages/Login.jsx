import React, { useState } from 'react';
import axios from 'axios';
import { FaUserPlus, FaComments, FaUserCircle } from "react-icons/fa";
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submission = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/auth/login',
        userData
      );
      console.log('User Successfully logged in: ', response.data);
    } catch (error) {
      console.error('Error logging user in: ', error);
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
              Log In
            </Button>
             
             <Link to={'/create'}> 
                <Button type = "submit" color Scheme ="gray" width="full" gap="2">
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
