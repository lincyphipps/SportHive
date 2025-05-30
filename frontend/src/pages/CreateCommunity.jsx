import React, { useState } from 'react';
import axios from 'axios';
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
import { useToast, Select } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;




const CreateCommunity = () => {
    const [communityData, setCommunityData] = useState({
        sport:"", //name of sport the community will be created for
        team_athlete: "", //team or individual athlete the community will follow (should be an n/a option if the community is to be based on the sport as a whole)
        privacy: "public", // options: public, invite, password (don't necessarily have to implement all of these but just some ideas on how)
        max_size: "", //max number of possible members
        location: "", //not sure how best to implement this, maybe we can use zip codes?
    });
    const navigate = useNavigate();
    const toast = useToast();
    //update state based on input
    const handleChange = (e) => {
        setCommunityData({
            ...communityData,
            [e.target.name]: e.target.value,
        });
    };
    //handle submisions which sends community data to backend
    const handleSubmission = async (e) => {
        e.preventDefault();
        try {
          const payload = {
            sport: communityData.sport,
            team: communityData.team_athlete,
            privacy: communityData.privacy,
            numMembers: parseInt(communityData.max_size, 10),
            zip: parseInt(communityData.location, 10),
          };
      
          const response = await axios.post(
            `${BASE_URL}/api/communities/create_community`,
            payload,
            {headers:{"Content-Type": "application/json"}}
          );          

          toast({
              title: "Community Created",
              description: "Your community has been successfully created.",
              status: "success",
              duration: 5000,
              isClosable: true,
          });
          navigate('/');
          setCommunityData({
            sport:"", //name of sport the community will be created for
            team_athlete: "", //team or individual athlete the community will follow (should be an n/a option if the community is to be based on the sport as a whole)
            privacy: "public", // options: public, invite, password (don't necessarily have to implement all of these but just some ideas on how)
            max_size: "", //max number of possible members
            location: "",
          });
        } catch (error) {
            console.error("Community not created successfully", error);
            toast({
                title: "Error",
                description: "There was an issue creating your community",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    //light and dark mode
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
            Create Community
          </Heading>
          <form onSubmit={handleSubmission}>
            <VStack spacing={4}>
              <FormControl id="sport" isRequired>
                <FormLabel>Sport</FormLabel>
                <Input
                  type="text"
                  name="sport"
                  value={communityData.sport}
                  onChange={handleChange}
                  placeholder="e.g., Basketball"
                />
              </FormControl>
              <FormControl id="team_athlete">
                <FormLabel>Team or Athlete</FormLabel>
                <Input
                  type="text"
                  name="team_athlete"
                  value={communityData.team_athlete}
                  onChange={handleChange}
                  placeholder="e.g., LA Lakers or Bronny James"
                />
              </FormControl>
              <FormControl id="privacy" isRequired>
                <FormLabel>Privacy</FormLabel>
                <Select
                  name="privacy"
                  value={communityData.privacy}
                  onChange={handleChange}
                >
                  <option value="public">Public (open to all)</option>
                  <option value="invite">Invite Only</option>
                  <option value="password">Password Protected</option>
                </Select>
              </FormControl>
              <FormControl id="max_size">
                <FormLabel>Max Members</FormLabel>
                <Input
                  type="number"
                  name="max_size"
                  value={communityData.max_size}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </FormControl>
              <FormControl id="location">
                <FormLabel>Location (Zip Code)</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={communityData.location}
                  onChange={handleChange}
                  placeholder="e.g., 12345"
                />
              </FormControl>
              <Button type="submit" colorScheme="yellow" width="full">
                Create Community
              </Button>

              <Link to={"/join_community"}> 
                <Button colorScheme ="gray" width="full" gap="2">
                Join Community
                <FaClipboardList />
                </Button>  
            </Link>
            </VStack>
          </form>
        </Box>
      </Box>
    );
  };
  
export default CreateCommunity;