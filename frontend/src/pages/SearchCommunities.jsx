import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Editable,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useToast, Select } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import { TbClipboardPlus } from "react-icons/tb";


//const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = 'http://localhost:5173';



const SearchCommunities = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    //const navigate = useNavigate();
    const toast = useToast();
    //update state based on input
    const handleSearch = async (e) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/communities/join_community`, 
                {params: {query: search}, 
            });
            setResults(response.data);
        }catch(e){
            console.error("Error fetching results", e);
            toast({
                title: "Search failed.",
                description: "Could not fetch communities.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };
    const handleJoin = async (communityId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user._id); 
        
            await axios.post(`${BASE_URL}/api/communities/join_community/${communityId}`,
              {userId: user._id},
              {headers: {"Content-Type": "application/json"}}
            );
        
            toast({
              title: "Joined!",
              description: "You have successfully joined the community.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
        
          } catch (error) {
            console.error("Join failed", error);
            toast({
              title: "Join failed.",
              description: "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        
    };

    //light and dark mode
    const pageBg = useColorModeValue('gray.100', 'gray.900'); 
    const cardBg = useColorModeValue('white', 'gray.700');



return (
    <Box bg={pageBg} minH="100vh" py={10} px={4}>
    <VStack spacing={6} maxW="lg" mx="auto" bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="lg">Search Communities</Heading>

      <FormControl>
        <FormLabel>Search by sport, team, or zip code</FormLabel>
        <Input
          placeholder="e.g., Soccer, Lakers, 90210"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="yellow" width="full" onClick={handleSearch}>
        Search
      </Button>

      <Link to="/create_community">
        <Button colorScheme="gray" width="full" gap={2}>
          Create Community <TbClipboardPlus />
        </Button>
      </Link>
    {/*https://www.youtube.com/watch?v=AEsww0nGpMk*/}
      {results.length > 0 && (
        <Box w="full">
          <Heading size="md" mb={2}>Results:</Heading>
          {results.map((community, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={2}>
              <Text><strong>Sport:</strong> {community.sport}</Text>
              <Text><strong>Team:</strong> {community.team || "N/A"}</Text>
              <Text><strong>Privacy:</strong> {community.privacy}</Text>
              <Text><strong>Zip Code:</strong> {community.zip}</Text>
              <Text><strong>Members:</strong> {community.numMembers || 0}</Text>
              <Button colorScheme="blue" size="sm" mt={2} onClick={()=>handleJoin(community._id)}>
                Join
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </VStack>
  </Box>
    );
  };
  
export default SearchCommunities;