import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, VStack, Heading, Input, Button, Text, useColorModeValue, useToast } from '@chakra-ui/react';

const BASE_URL = 'http://localhost:5000';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async (query = "") => {
    try {
      const res = await axios.get(`${BASE_URL}/api/communities/join_community`, {
        params: { query }
      });
      setCommunities(res.data);
    } catch (error) {
      console.error("Failed fetching communities:", error);
    }
  };

  const handleSearch = () => {
    fetchCommunities(searchQuery);
  };

  const handleJoin = async (communityId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        toast({
          title: "Not logged in",
          description: "You must log in to join a community.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      await axios.post(`${BASE_URL}/api/communities/join_community/${communityId}`,
        { userId: user._id },
        { headers: { "Content-Type": "application/json" } }
      );

      toast({
        title: "Joined successfully!",
        description: "You have joined the community.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

    } catch (error) {
      console.error("Error joining community:", error);
      toast({
        title: "Join failed.",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const pageBg = useColorModeValue('gray.100', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={pageBg} minH="100vh" p={8}>
      <VStack spacing={6} maxW="800px" mx="auto" bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
        <Heading size="lg">All Communities</Heading>

        <Input
          placeholder="Search by sport, team, or zip"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button onClick={handleSearch} colorScheme="yellow">
          Search
        </Button>

        {communities.map((community) => (
          <Box key={community._id} p={4} borderWidth="1px" borderRadius="md" w="100%">
            <Text><strong>Sport:</strong> {community.sport}</Text>
            <Text><strong>Team:</strong> {community.team || "N/A"}</Text>
            <Text><strong>Privacy:</strong> {community.privacy}</Text>
            <Text><strong>Zip Code:</strong> {community.zip}</Text>
            <Text><strong>Members:</strong> {community.numMembers || 0}</Text>

            {/* JOIN BUTTON */}
            <Button colorScheme="yellow" size="sm" mt={3} onClick={() => handleJoin(community._id)}>
              Join Community
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CommunityList;



/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, VStack, Heading, Input, Button, Text, useColorModeValue } from '@chakra-ui/react';

const BASE_URL = 'http://localhost:5000';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async (query = "") => {
    try {
      const res = await axios.get(`${BASE_URL}/api/communities/join_community`, {
        params: { query }
      });
      setCommunities(res.data);
    } catch (error) {
      console.error("Failed fetching communities:", error);
    }
  };

  const handleSearch = () => {
    fetchCommunities(searchQuery);
  };

  const pageBg = useColorModeValue('gray.100', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={pageBg} minH="100vh" p={8}>
      <VStack spacing={6} maxW="800px" mx="auto" bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
        <Heading size="lg">All Communities</Heading>

        <Input
          placeholder="Search by sport, team, or zip"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button onClick={handleSearch} colorScheme="yellow">
          Search
        </Button>

        {communities.map((community) => (
          <Box key={community._id} p={4} borderWidth="1px" borderRadius="md" w="100%">
            <Text><strong>Sport:</strong> {community.sport}</Text>
            <Text><strong>Team:</strong> {community.team || "N/A"}</Text>
            <Text><strong>Privacy:</strong> {community.privacy}</Text>
            <Text><strong>Zip Code:</strong> {community.zip}</Text>
            <Text><strong>Members:</strong> {community.numMembers || 0}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CommunityList;
*/