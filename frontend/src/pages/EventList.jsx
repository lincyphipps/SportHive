import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  VStack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const EventList = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events/all`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };
    fetchEvents();
  }, []);

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
            Events
          </Heading>
            <VStack spacing={4}>
              {events.length == 0 ?
              <Text paddingBottom = "1rem" fontSize="lg" color="gray.500" textAlign="center">
                No events available
              </Text>
              : null}
              {events.map((event) => (
                <Box key={event._id} p={4} borderWidth="1px" borderRadius="md" width="100%">
                  <Text fontWeight="bold">{event.title}</Text>
                  <Text><strong>Hosted By:</strong> {event.Author.username}</Text>
                  <Text><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</Text>
                  <Text><strong>Location:</strong> {event.location}</Text>
                  <Text>{event.description}</Text>
                </Box>
              ))}
            <Link to={"/create_event"}>
              <Button colorScheme ="yellow" width="full" gap="2">
                Create New Event
              </Button>
            </Link>
            </VStack>
        </Box>
      </Box>
    );
  };
  
export default EventList;