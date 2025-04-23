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
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    setEventData({
            ...eventData, [e.target.name]: e.target.value,
        });
    };
    //handle submisions which sends community data to backend
  const handleSubmission = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
      try {
          const response = await axios.post(
            `${BASE_URL}/api/events/create`,
            eventData,
            {headers: { Authorization: `Bearer ${token}` } }
          );          

          toast({
            title: 'Event Created',
            description: 'Your event has been successfully created.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate('/events');
        } catch (error) {
            console.error("Error creating event:", error);
            toast({
                title: "Error",
                description: "There was an issue creating your event",
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
            Create Event
          </Heading>
          <form onSubmit={handleSubmission}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  placeholder="Event Location"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  placeholder="Event Description"
                />
              </FormControl>
              <Button type="submit" colorScheme="yellow" width="full">
                Create Event
              </Button>
            </VStack>
          </form>
      </Box>
      </Box>
    );
  };
  
export default CreateEvent;